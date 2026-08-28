import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import {
  approvePreApprovalAuthorityPackage,
  serializeApprovedAuthorityPackage,
  type ApprovedPackageStore,
  type PreApprovalAuthorityPackageInput,
} from "../approved-package/approvedPackageRepository";
import type { CompletionAnchorRow, CompletionAnchorStore } from "../completion-anchor/completionAnchorRepository";
import { deriveLearningDesign } from "../learning-science/deriveLearningDesign";
import { formLaterRetrievalPrerequisite, relevantContextIdentity, reviewLaterRetrievalPrerequisite } from "../learning-science/laterRetrievalPrerequisite";
import { createAuthorityIdentity, formResponseEvaluationContract, reviewResponseEvaluationContract } from "../learning-science/responseEvaluationContract";
import type { Database } from "../../types/database";
import {
  atomicallyConsumeLaterRetrievalOnce,
  type AtomicLaterRetrievalConsumptionFact,
  type AtomicLaterRetrievalConsumptionPersistence,
  type AtomicLaterRetrievalConsumptionTuple,
} from "./atomicLaterRetrievalSingleConsumptionTransition";

const source = "Mentalization concerns mental states in oneself and others.";
const owner = "11111111-1111-4111-8111-111111111111";
const anchorIdentity = "22222222-2222-4222-8222-222222222222";
const consumptionIdentity = "33333333-3333-4333-8333-333333333333";

function authority() {
  const design = deriveLearningDesign({ learningObjective: { statement: "Explain mentalization." }, relevantContext: { description: "Durable retention.", durableRetentionOfPreviouslyAcquiredKnowledgeIntended: true } });
  const boundary = { startOffset: 0, endOffset: source.length };
  const contract = formResponseEvaluationContract(design, { identity: "contract-1", learningObjectiveIdentity: design.learningObjectiveIdentity, supportingSource: { identity: createAuthorityIdentity("source", { context: source, boundary }), boundary }, correctionRequirementReference: design.feedbackResultRequirement.description, requiredResponseElements: [{ identity: "element-1", claim: "oneself and others", acceptedFormulations: ["oneself and others"], contradictingFormulations: ["only behavior"], informativeFeedback: "Include both." }] }, source);
  const prerequisite = formLaterRetrievalPrerequisite(design, { identity: "later-1", proposedLearningDesignIdentity: design.identity, learningObjectiveIdentity: design.learningObjectiveIdentity, relevantContextIdentity: relevantContextIdentity(design), supportingSourceBoundaryIdentity: contract.supportingSource.identity, earliestEligibilityDelay: { value: 1, unit: "DAYS" }, creatorAuthorityReference: "creator-1" });
  return approvePreApprovalAuthorityPackage({ proposedLearningDesign: design, reviewedResponseEvaluationContractDraft: { ...reviewResponseEvaluationContract(design, contract, true), supportingSourceContext: source }, reviewedLaterRetrievalPrerequisiteDraft: reviewLaterRetrievalPrerequisite(design, prerequisite, true) } satisfies PreApprovalAuthorityPackageInput);
}

class ApprovedStore implements Pick<ApprovedPackageStore, "findForOwner"> {
  reads = 0;
  constructor(readonly pkg = authority(), readonly transform?: (row: Record<string, string>) => Record<string, string> | null) {}
  async findForOwner(ownerId: string): Promise<Awaited<ReturnType<ApprovedPackageStore["findForOwner"]>>> {
    this.reads += 1;
    if (ownerId !== owner) return null;
    const serialized = serializeApprovedAuthorityPackage(this.pkg);
    const row = { owner_id: owner, package_identity: this.pkg.learningDesign.identity, serialized_package: serialized, package_digest: createHash("sha256").update(serialized).digest("hex") };
    return (this.transform ? this.transform(row) : row) as typeof row | null;
  }
}

class AnchorStore implements Pick<CompletionAnchorStore, "find"> {
  reads = 0;
  constructor(readonly pkg = authority(), readonly transform?: (row: CompletionAnchorRow) => CompletionAnchorRow | null) {}
  row(): CompletionAnchorRow {
    const design = this.pkg.learningDesign;
    return { completion_anchor_identity: anchorIdentity, owner_id: owner, package_identity: design.identity, approved_learning_design_identity: design.identity, approved_learning_design_snapshot: JSON.stringify(design), response_evaluation_contract_identity: design.responseEvaluationContractIdentity, response_evaluation_contract_snapshot: design.responseEvaluationContractSnapshot, retrieval_interaction_identity: `first-approved-retrieval:${design.identity}`, terminal_interaction_digest: "a".repeat(64), completed_at: "2026-08-24T10:00:00Z" };
  }
  async find(ownerId: string, packageIdentity: string) {
    this.reads += 1;
    const row = this.transform ? this.transform(this.row()) : this.row();
    return row?.owner_id === ownerId && row.package_identity === packageIdentity ? structuredClone(row) : null;
  }
}

class Persistence implements AtomicLaterRetrievalConsumptionPersistence {
  calls = 0;
  tuples: AtomicLaterRetrievalConsumptionTuple[] = [];
  constructor(readonly result: (tuple: AtomicLaterRetrievalConsumptionTuple) => unknown = exactFact) {}
  async createOnce(tuple: AtomicLaterRetrievalConsumptionTuple) {
    this.calls += 1;
    this.tuples.push(tuple);
    return this.result(tuple);
  }
}

function exactFact(tuple: AtomicLaterRetrievalConsumptionTuple): AtomicLaterRetrievalConsumptionFact {
  return Object.freeze({ ...tuple, consumptionIdentity, createdAt: "2026-08-25T10:00:00Z" });
}

function setup(result?: (tuple: AtomicLaterRetrievalConsumptionTuple) => unknown) {
  const pkg = authority();
  return { approved: new ApprovedStore(pkg), anchor: new AnchorStore(pkg), persistence: new Persistence(result) };
}

const dueClock = () => BigInt("1787652000000000");
const beforeClock = () => BigInt("1787565599999999");

describe("authoritative atomic later-retrieval single-consumption transition", () => {
  it("constructs the exact deeply frozen tuple after one package read, one anchor read, and one clock call", async () => {
    const stores = setup(); let clocks = 0;
    const result = await atomicallyConsumeLaterRetrievalOnce(stores.approved, stores.anchor, stores.persistence, owner, () => { clocks += 1; return dueClock(); });
    expect(result).toEqual({ outcome: "CONSUMED_ONCE", packageIdentity: stores.approved.pkg.learningDesign.identity, consumptionIdentity });
    expect(Object.isFrozen(result)).toBe(true);
    expect([stores.approved.reads, stores.anchor.reads, clocks, stores.persistence.calls]).toEqual([1, 1, 1, 1]);
    const tuple = stores.persistence.tuples[0];
    expect(Object.isFrozen(tuple)).toBe(true);
    expect(tuple).toEqual({ authenticatedOwnerIdentity: owner, persistedApprovedPackageIdentity: stores.approved.pkg.learningDesign.identity, approvedLearningDesignIdentity: stores.approved.pkg.learningDesign.identity, approvedLearningDesignSnapshot: JSON.stringify(stores.approved.pkg.learningDesign), laterRetrievalPrerequisiteIdentity: stores.approved.pkg.learningDesign.laterRetrievalPrerequisite.identity, laterRetrievalPrerequisiteSnapshot: stores.approved.pkg.learningDesign.laterRetrievalPrerequisiteSnapshot, completionAnchorIdentity: anchorIdentity, completionAnchorSnapshot: JSON.stringify({ ownerId: owner, packageIdentity: stores.approved.pkg.learningDesign.identity, approvedLearningDesignIdentity: stores.approved.pkg.learningDesign.identity, approvedLearningDesignSnapshot: JSON.stringify(stores.approved.pkg.learningDesign), responseEvaluationContractIdentity: stores.approved.pkg.learningDesign.responseEvaluationContractIdentity, responseEvaluationContractSnapshot: stores.approved.pkg.learningDesign.responseEvaluationContractSnapshot, retrievalInteractionIdentity: `first-approved-retrieval:${stores.approved.pkg.learningDesign.identity}`, terminalInteractionDigest: "a".repeat(64), completedAt: "2026-08-24T10:00:00Z" }) });
  });

  it("uses the one shared frozen reference-free failure and performs zero writes before threshold", async () => {
    const first = setup(); const second = setup();
    const a = await atomicallyConsumeLaterRetrievalOnce(first.approved, first.anchor, first.persistence, owner, beforeClock);
    const b = await atomicallyConsumeLaterRetrievalOnce(second.approved, second.anchor, second.persistence, "", dueClock);
    expect(a).toBe(b); expect(a).toEqual({ outcome: "FAIL_CLOSED" }); expect(Object.keys(a)).toEqual(["outcome"]); expect(Object.isFrozen(a)).toBe(true);
    expect(first.persistence.calls + second.persistence.calls).toBe(0);
  });

  it.each([
    ["missing package", () => null, undefined],
    ["package identity", (row: Record<string, string>) => ({ ...row, package_identity: "other" }), undefined],
    ["package digest", (row: Record<string, string>) => ({ ...row, package_digest: "0".repeat(64) }), undefined],
    ["missing anchor", undefined, () => null],
    ["anchor owner", undefined, (row: CompletionAnchorRow) => ({ ...row, owner_id: "44444444-4444-4444-8444-444444444444" })],
    ["anchor snapshot", undefined, (row: CompletionAnchorRow) => ({ ...row, approved_learning_design_snapshot: "{}" })],
    ["anchor identity", undefined, (row: CompletionAnchorRow) => ({ ...row, completion_anchor_identity: "invalid" })],
  ])("fails closed with zero writes for %s", async (_name, packageTransform, anchorTransform) => {
    const pkg = authority(); const persistence = new Persistence();
    const result = await atomicallyConsumeLaterRetrievalOnce(new ApprovedStore(pkg, packageTransform), new AnchorStore(pkg, anchorTransform), persistence, owner, dueClock);
    expect(result).toEqual({ outcome: "FAIL_CLOSED" }); expect(persistence.calls).toBe(0);
  });

  it.each([
    ["null", () => null],
    ["mutable", (tuple: AtomicLaterRetrievalConsumptionTuple) => ({ ...exactFact(tuple) })],
    ["empty identity", (tuple: AtomicLaterRetrievalConsumptionTuple) => Object.freeze({ ...exactFact(tuple), consumptionIdentity: "" })],
    ["existing identity disclosure", (tuple: AtomicLaterRetrievalConsumptionTuple) => Object.freeze({ ...exactFact(tuple), authenticatedOwnerIdentity: "other" })],
    ["malformed", () => Object.freeze({ status: "conflict" })],
    ["throw", () => { throw new Error("ambiguous commit"); }],
  ])("fails closed without retry or lookup for %s persistence evidence", async (_name, resultFactory) => {
    const stores = setup(resultFactory);
    const result = await atomicallyConsumeLaterRetrievalOnce(stores.approved, stores.anchor, stores.persistence, owner, dueClock);
    expect(result).toEqual({ outcome: "FAIL_CLOSED" }); expect(stores.persistence.calls).toBe(1);
  });

  it("does not infer success for replay or concurrency losers", async () => {
    const stores = setup(() => null);
    const results = await Promise.all(Array.from({ length: 6 }, () => atomicallyConsumeLaterRetrievalOnce(stores.approved, stores.anchor, stores.persistence, owner, dueClock)));
    expect(results).toEqual(Array.from({ length: 6 }, () => ({ outcome: "FAIL_CLOSED" })));
    expect(stores.persistence.calls).toBe(6);
  });

  it("binds the focused proof to the exact migration and generated non-updatable shapes", () => {
    const sql = readFileSync("supabase/migrations/20260825110000_create_later_retrieval_single_consumption.sql", "utf8");
    expect(sql).toContain("later_retrieval_single_consumptions_exact_tuple_key unique");
    expect(sql).toContain("on conflict on constraint later_retrieval_single_consumptions_exact_tuple_key do nothing");
    expect(sql).toContain("before update on public.later_retrieval_single_consumptions");
    expect(sql).toContain("before delete on public.later_retrieval_single_consumptions");
    expect(sql).toContain("to service_role");
    type Table = Database["public"]["Tables"]["later_retrieval_single_consumptions"];
    type Rpc = Database["public"]["Functions"]["create_later_retrieval_single_consumption_once"];
    const insert: Table["Insert"] = { authenticated_owner_identity: owner, persisted_approved_package_identity: "package", approved_learning_design_identity: "design", approved_learning_design_snapshot: "design-snapshot", later_retrieval_prerequisite_identity: "prerequisite", later_retrieval_prerequisite_snapshot: "prerequisite-snapshot", completion_anchor_identity: anchorIdentity, completion_anchor_snapshot: "anchor-snapshot" };
    const update: Table["Update"] = {};
    const args: Rpc["Args"] = { p_authenticated_owner_identity: owner, p_persisted_approved_package_identity: "package", p_approved_learning_design_identity: "design", p_approved_learning_design_snapshot: "design-snapshot", p_later_retrieval_prerequisite_identity: "prerequisite", p_later_retrieval_prerequisite_snapshot: "prerequisite-snapshot", p_completion_anchor_identity: anchorIdentity, p_completion_anchor_snapshot: "anchor-snapshot" };
    expect([insert, update, args]).toHaveLength(3);
  });
});

import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  approvePreApprovalAuthorityPackage,
  serializeApprovedAuthorityPackage,
  type ApprovedPackageStore,
  type PreApprovalAuthorityPackageInput,
} from "../approved-package/approvedPackageRepository";
import type { CompletionAnchorRow, CompletionAnchorStore } from "../completion-anchor/completionAnchorRepository";
import { deriveLearningDesign } from "../learning-science/deriveLearningDesign";
import {
  formLaterRetrievalPrerequisite,
  relevantContextIdentity,
  reviewLaterRetrievalPrerequisite,
} from "../learning-science/laterRetrievalPrerequisite";
import {
  createAuthorityIdentity,
  formResponseEvaluationContract,
  reviewResponseEvaluationContract,
} from "../learning-science/responseEvaluationContract";
import {
  guardLaterRetrievalSingleConsumption,
  type LaterRetrievalConsumptionReadResult,
  type LaterRetrievalConsumptionStore,
  type LaterRetrievalOpportunityTuple,
} from "./laterRetrievalSingleConsumptionGuard";

const source = "Mentalization concerns mental states in oneself and others.";

function authority() {
  const design = deriveLearningDesign({ learningObjective: { statement: "Explain mentalization." }, relevantContext: { description: "Durable retention.", durableRetentionOfPreviouslyAcquiredKnowledgeIntended: true } });
  const boundary = { startOffset: 0, endOffset: source.length };
  const contract = formResponseEvaluationContract(design, { identity: "contract-1", learningObjectiveIdentity: design.learningObjectiveIdentity, supportingSource: { identity: createAuthorityIdentity("source", { context: source, boundary }), boundary }, correctionRequirementReference: design.feedbackResultRequirement.description, requiredResponseElements: [{ identity: "element-1", claim: "oneself and others", acceptedFormulations: ["oneself and others"], contradictingFormulations: ["only behavior"], informativeFeedback: "Include both." }] }, source);
  const prerequisite = formLaterRetrievalPrerequisite(design, { identity: "later-1", proposedLearningDesignIdentity: design.identity, learningObjectiveIdentity: design.learningObjectiveIdentity, relevantContextIdentity: relevantContextIdentity(design), supportingSourceBoundaryIdentity: contract.supportingSource.identity, earliestEligibilityDelay: { value: 1, unit: "DAYS" }, creatorAuthorityReference: "creator-1" });
  return approvePreApprovalAuthorityPackage({ proposedLearningDesign: design, reviewedResponseEvaluationContractDraft: { ...reviewResponseEvaluationContract(design, contract, true), supportingSourceContext: source }, reviewedLaterRetrievalPrerequisiteDraft: reviewLaterRetrievalPrerequisite(design, prerequisite, true) } satisfies PreApprovalAuthorityPackageInput);
}

class ApprovedStore implements Pick<ApprovedPackageStore, "findForOwner"> {
  reads = 0;
  constructor(readonly pkg = authority(), readonly owner = "owner-a", readonly transform?: (row: NonNullable<Awaited<ReturnType<ApprovedPackageStore["findForOwner"]>>>) => unknown) {}
  async findForOwner(ownerId: string): Promise<Awaited<ReturnType<ApprovedPackageStore["findForOwner"]>>> {
    this.reads += 1;
    if (ownerId !== this.owner) return null;
    const serialized = serializeApprovedAuthorityPackage(this.pkg);
    const row = { owner_id: this.owner, package_identity: this.pkg.learningDesign.identity, serialized_package: serialized, package_digest: createHash("sha256").update(serialized).digest("hex") };
    return (this.transform ? this.transform(row) : row) as typeof row;
  }
}

class AnchorStore implements Pick<CompletionAnchorStore, "find"> {
  reads = 0;
  constructor(readonly pkg = authority(), readonly transform?: (row: CompletionAnchorRow) => CompletionAnchorRow | null) {}
  row(): CompletionAnchorRow {
    const design = this.pkg.learningDesign;
    return { completion_anchor_identity: "8b4b3f62-4a77-4d26-9d55-2c9c86b42f31", owner_id: "owner-a", package_identity: design.identity, approved_learning_design_identity: design.identity, approved_learning_design_snapshot: JSON.stringify(design), response_evaluation_contract_identity: design.responseEvaluationContractIdentity, response_evaluation_contract_snapshot: design.responseEvaluationContractSnapshot, retrieval_interaction_identity: `first-approved-retrieval:${design.identity}`, terminal_interaction_digest: "a".repeat(64), completed_at: "2026-08-25T10:00:00Z" };
  }
  async find(ownerId: string, packageIdentity: string) {
    this.reads += 1;
    const row = this.transform ? this.transform(this.row()) : this.row();
    return row?.owner_id === ownerId && row.package_identity === packageIdentity ? structuredClone(row) : null;
  }
}

class ConsumptionStore implements LaterRetrievalConsumptionStore {
  reads = 0;
  tuples: LaterRetrievalOpportunityTuple[] = [];
  constructor(readonly result: LaterRetrievalConsumptionReadResult | ((tuple: LaterRetrievalOpportunityTuple) => unknown) = Object.freeze({ status: "ABSENT" })) {}
  async readExact(tuple: LaterRetrievalOpportunityTuple) {
    this.reads += 1;
    this.tuples.push(tuple);
    return (typeof this.result === "function" ? this.result(tuple) : this.result) as LaterRetrievalConsumptionReadResult;
  }
}

function setup(result?: ConstructorParameters<typeof ConsumptionStore>[0]) {
  const pkg = authority();
  return { approved: new ApprovedStore(pkg), anchor: new AnchorStore(pkg), consumption: new ConsumptionStore(result) };
}

describe("exact later-retrieval single-consumption guard", () => {
  it("returns only the exact frozen success for authoritative frozen absence and reads in fixed order", async () => {
    const { approved, anchor, consumption } = setup();
    const result = await guardLaterRetrievalSingleConsumption(approved, anchor, consumption, "owner-a");
    expect(result).toEqual({ outcome: "UNCONSUMED_AT_GUARD", packageIdentity: approved.pkg.learningDesign.identity });
    expect(Object.isFrozen(result)).toBe(true);
    expect(consumption.reads).toBe(1);
    expect(consumption.tuples).toHaveLength(1);
    const tuple = consumption.tuples[0];
    expect(Object.isFrozen(tuple)).toBe(true);
    expect(Object.isFrozen(tuple.completionAnchorSnapshot)).toBe(true);
    expect(tuple).toEqual({ authenticatedOwnerIdentity: "owner-a", persistedApprovedPackageIdentity: approved.pkg.learningDesign.identity, approvedLearningDesignIdentity: approved.pkg.learningDesign.identity, approvedLearningDesignSnapshot: JSON.stringify(approved.pkg.learningDesign), laterRetrievalPrerequisiteIdentity: approved.pkg.learningDesign.laterRetrievalPrerequisite.identity, laterRetrievalPrerequisiteSnapshot: approved.pkg.learningDesign.laterRetrievalPrerequisiteSnapshot, completionAnchorIdentity: "8b4b3f62-4a77-4d26-9d55-2c9c86b42f31", completionAnchorSnapshot: expect.objectContaining({ ownerId: "owner-a", packageIdentity: approved.pkg.learningDesign.identity }) });
    expect(approved.reads).toBe(1);
    expect(anchor.reads).toBe(1);
  });

  it("returns the one shared frozen reference-free failure for an exact present fact", async () => {
    const resultFactory = (tuple: LaterRetrievalOpportunityTuple) => Object.freeze({ status: "PRESENT", fact: Object.freeze({ ...tuple, consumptionIdentity: "server-consumption-1" }) });
    const first = setup(resultFactory); const second = setup(resultFactory);
    const a = await guardLaterRetrievalSingleConsumption(first.approved, first.anchor, first.consumption, "owner-a");
    const b = await guardLaterRetrievalSingleConsumption(second.approved, second.anchor, second.consumption, "owner-a");
    expect(a).toBe(b);
    expect(a).toEqual({ outcome: "FAIL_CLOSED" });
    expect(Object.keys(a)).toEqual(["outcome"]);
    expect(Object.isFrozen(a)).toBe(true);
  });

  it.each([
    ["mutable absence", { status: "ABSENT" }],
    ["extra absence data", Object.freeze({ status: "ABSENT", reason: "cache miss" })],
    ["malformed", Object.freeze({ status: "MAYBE" })],
    ["partial", Object.freeze({})],
    ["duplicate", Object.freeze({ status: "PRESENT", facts: Object.freeze([]) })],
    ["conflicting", Object.freeze({ status: "CONFLICTING" })],
    ["unreadable", Object.freeze({ status: "UNREADABLE" })],
  ])("fails closed for %s namespace results", async (_name, readResult) => {
    const stores = setup(readResult as LaterRetrievalConsumptionReadResult);
    await expect(guardLaterRetrievalSingleConsumption(stores.approved, stores.anchor, stores.consumption, "owner-a")).resolves.toEqual({ outcome: "FAIL_CLOSED" });
    expect(stores.consumption.reads).toBe(1);
  });

  it.each([
    ["empty identity", (tuple: LaterRetrievalOpportunityTuple) => Object.freeze({ status: "PRESENT", fact: Object.freeze({ ...tuple, consumptionIdentity: " " }) })],
    ["mutable fact", (tuple: LaterRetrievalOpportunityTuple) => Object.freeze({ status: "PRESENT", fact: { ...tuple, consumptionIdentity: "consumed" } })],
    ["owner mismatch", (tuple: LaterRetrievalOpportunityTuple) => Object.freeze({ status: "PRESENT", fact: Object.freeze({ ...tuple, authenticatedOwnerIdentity: "owner-b", consumptionIdentity: "consumed" }) })],
    ["package mismatch", (tuple: LaterRetrievalOpportunityTuple) => Object.freeze({ status: "PRESENT", fact: Object.freeze({ ...tuple, persistedApprovedPackageIdentity: "other", consumptionIdentity: "consumed" }) })],
    ["design snapshot mismatch", (tuple: LaterRetrievalOpportunityTuple) => Object.freeze({ status: "PRESENT", fact: Object.freeze({ ...tuple, approvedLearningDesignSnapshot: "{}", consumptionIdentity: "consumed" }) })],
    ["prerequisite mismatch", (tuple: LaterRetrievalOpportunityTuple) => Object.freeze({ status: "PRESENT", fact: Object.freeze({ ...tuple, laterRetrievalPrerequisiteIdentity: "other", consumptionIdentity: "consumed" }) })],
    ["anchor mismatch", (tuple: LaterRetrievalOpportunityTuple) => Object.freeze({ status: "PRESENT", fact: Object.freeze({ ...tuple, completionAnchorIdentity: "other", consumptionIdentity: "consumed" }) })],
    ["anchor snapshot substitution", (tuple: LaterRetrievalOpportunityTuple) => Object.freeze({ status: "PRESENT", fact: Object.freeze({ ...tuple, completionAnchorSnapshot: Object.freeze({ ...tuple.completionAnchorSnapshot }), consumptionIdentity: "consumed" }) })],
  ])("fails closed for a present fact with %s", async (_name, factory) => {
    const stores = setup(factory);
    await expect(guardLaterRetrievalSingleConsumption(stores.approved, stores.anchor, stores.consumption, "owner-a")).resolves.toEqual({ outcome: "FAIL_CLOSED" });
  });

  it("fails closed on thrown namespace reads without retry or fallback", async () => {
    const stores = setup(() => { throw new Error("unreadable"); });
    await expect(guardLaterRetrievalSingleConsumption(stores.approved, stores.anchor, stores.consumption, "owner-a")).resolves.toEqual({ outcome: "FAIL_CLOSED" });
    expect(stores.consumption.reads).toBe(1);
  });

  it.each(["", " ", "owner-b"])("fails authentication or ownership before the namespace read: %j", async (owner) => {
    const stores = setup();
    await expect(guardLaterRetrievalSingleConsumption(stores.approved, stores.anchor, stores.consumption, owner)).resolves.toEqual({ outcome: "FAIL_CLOSED" });
    expect(stores.consumption.reads).toBe(0);
  });

  it.each([
    ["missing package", () => null],
    ["package identity", (row: Record<string, string>) => ({ ...row, package_identity: "other" })],
    ["package snapshot", (row: Record<string, string>) => ({ ...row, serialized_package: "{}" })],
    ["package digest", (row: Record<string, string>) => ({ ...row, package_digest: "0".repeat(64) })],
  ])("fails %s authority before anchor and namespace reads", async (_name, transform) => {
    const stores = setup();
    const approved = new ApprovedStore(stores.approved.pkg, "owner-a", transform as never);
    await expect(guardLaterRetrievalSingleConsumption(approved, stores.anchor, stores.consumption, "owner-a")).resolves.toEqual({ outcome: "FAIL_CLOSED" });
    expect(stores.anchor.reads).toBe(0); expect(stores.consumption.reads).toBe(0);
  });

  it.each([
    ["missing", () => null],
    ["owner", (row: CompletionAnchorRow) => ({ ...row, owner_id: "owner-b" })],
    ["package", (row: CompletionAnchorRow) => ({ ...row, package_identity: "other" })],
    ["design", (row: CompletionAnchorRow) => ({ ...row, approved_learning_design_identity: "other" })],
    ["design snapshot", (row: CompletionAnchorRow) => ({ ...row, approved_learning_design_snapshot: "{}" })],
    ["anchor", (row: CompletionAnchorRow) => ({ ...row, completion_anchor_identity: "not-an-identity" })],
    ["lifecycle binding", (row: CompletionAnchorRow) => ({ ...row, retrieval_interaction_identity: "replaced" })],
  ])("fails %s anchor authority before the namespace read", async (_name, transform) => {
    const stores = setup();
    const anchor = new AnchorStore(stores.approved.pkg, transform as (row: CompletionAnchorRow) => CompletionAnchorRow | null);
    await expect(guardLaterRetrievalSingleConsumption(stores.approved, anchor, stores.consumption, "owner-a")).resolves.toEqual({ outcome: "FAIL_CLOSED" });
    expect(stores.consumption.reads).toBe(0);
  });

  it("keeps repeated and concurrent calls read-only, independent, and non-authorizing", async () => {
    const stores = setup();
    const before = structuredClone(stores.approved.pkg);
    const results = await Promise.all(Array.from({ length: 5 }, () => guardLaterRetrievalSingleConsumption(stores.approved, stores.anchor, stores.consumption, "owner-a")));
    expect(results).toEqual(Array.from({ length: 5 }, () => ({ outcome: "UNCONSUMED_AT_GUARD", packageIdentity: stores.approved.pkg.learningDesign.identity })));
    expect(stores.consumption.reads).toBe(5);
    expect(stores.approved.pkg).toEqual(before);
    expect(stores.consumption.tuples).toHaveLength(5);
    expect(stores.consumption).not.toHaveProperty("create");
    expect(stores.consumption).not.toHaveProperty("claim");
    expect(stores.consumption).not.toHaveProperty("consume");
  });
});

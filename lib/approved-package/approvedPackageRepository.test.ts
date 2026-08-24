import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { deriveLearningDesign } from "../learning-science/deriveLearningDesign";
import { formLaterRetrievalPrerequisite, relevantContextIdentity, reviewLaterRetrievalPrerequisite } from "../learning-science/laterRetrievalPrerequisite";
import { createAuthorityIdentity, formResponseEvaluationContract, reviewResponseEvaluationContract } from "../learning-science/responseEvaluationContract";
import { approvePreApprovalAuthorityPackage, createOnceOrReturnIdentical, deserializeApprovedAuthorityPackage, requireOwnedApprovedAuthorityPackage, serializeApprovedAuthorityPackage, type ApprovedPackageStore, type PreApprovalAuthorityPackageInput } from "./approvedPackageRepository";

const sourceContext = "Mentalization concerns understanding mental states in oneself and others.";
type DeepMutable<T> = T extends readonly (infer U)[]
  ? DeepMutable<U>[]
  : T extends object ? { -readonly [K in keyof T]: DeepMutable<T[K]> } : T;
type Mutable = DeepMutable<PreApprovalAuthorityPackageInput>;
type Row = { owner_id: string; package_identity: string; serialized_package: string; package_digest: string };

function preApprovalInput(): PreApprovalAuthorityPackageInput {
  const design = deriveLearningDesign({ learningObjective: { statement: "Explain mentalization." }, relevantContext: { description: "Durable retention is intended.", durableRetentionOfPreviouslyAcquiredKnowledgeIntended: true } });
  const boundary = { startOffset: 11, endOffset: 75 };
  const contract = formResponseEvaluationContract(design, {
    identity: "contract-1", learningObjectiveIdentity: design.learningObjectiveIdentity,
    supportingSource: { identity: createAuthorityIdentity("source", { context: sourceContext, boundary }), boundary },
    correctionRequirementReference: design.feedbackResultRequirement.description,
    requiredResponseElements: [{ identity: "element-1", claim: "Mental states concern oneself and others.", acceptedFormulations: ["oneself and others"], contradictingFormulations: ["only behavior"], informativeFeedback: "Include oneself and others." }],
  }, sourceContext);
  const prerequisite = formLaterRetrievalPrerequisite(design, {
    identity: "later-1", proposedLearningDesignIdentity: design.identity, learningObjectiveIdentity: design.learningObjectiveIdentity,
    relevantContextIdentity: relevantContextIdentity(design), supportingSourceBoundaryIdentity: contract.supportingSource.identity,
    earliestEligibilityDelay: { value: 2, unit: "DAYS" }, creatorAuthorityReference: "creator-1",
  });
  return {
    proposedLearningDesign: design,
    reviewedResponseEvaluationContractDraft: {
      ...reviewResponseEvaluationContract(design, contract, true),
      supportingSourceContext: sourceContext,
    },
    reviewedLaterRetrievalPrerequisiteDraft: reviewLaterRetrievalPrerequisite(
      design,
      prerequisite,
      true,
    ),
  };
}

class MemoryStore implements ApprovedPackageStore {
  rows = new Map<string, Row>();
  insertCount = 0;
  async findForOwner(ownerId: string) { return this.rows.get(ownerId) ?? null; }
  async insert(row: Row) { if (this.rows.has(row.owner_id)) return "conflict" as const; this.insertCount += 1; this.rows.set(row.owner_id, row); return "inserted" as const; }
}

describe("authenticated approved authority package handoff", () => {
  it("turns the real JSON-shaped pre-approval request into one frozen server-approved package and event", async () => {
    const request = JSON.parse(JSON.stringify(preApprovalInput()));
    const approved = approvePreApprovalAuthorityPackage(request);
    expect(approved.learningDesign.state).toBe("APPROVED");
    expect(approved.learningDesign.laterRetrievalPrerequisite.creatorApprovalEvent).toMatch(/^[0-9a-f-]{36}$/u);
    expect(request.reviewedLaterRetrievalPrerequisiteDraft.prerequisite).not.toHaveProperty("creatorApprovalEvent");
    expect(Object.keys(request)).toEqual([
      "proposedLearningDesign",
      "reviewedResponseEvaluationContractDraft",
      "reviewedLaterRetrievalPrerequisiteDraft",
    ]);
    expect(Object.isFrozen(approved.learningDesign)).toBe(true);
    const store = new MemoryStore();
    await createOnceOrReturnIdentical(store, "owner-a", approved);
    await createOnceOrReturnIdentical(store, "owner-a", approved);
    expect(store.insertCount).toBe(1);
  });

  it("rejects client-supplied APPROVED state, approval event, snapshots, and final authority fields", () => {
    const cases: Mutable[] = [];
    const approvedState = JSON.parse(JSON.stringify(preApprovalInput())); approvedState.proposedLearningDesign.state = "APPROVED"; cases.push(approvedState);
    const approvalEvent = JSON.parse(JSON.stringify(preApprovalInput())); Object.assign(approvalEvent.reviewedLaterRetrievalPrerequisiteDraft.prerequisite, { creatorApprovalEvent: crypto.randomUUID() }); cases.push(approvalEvent);
    for (const [key, value] of [["responseEvaluationContractSnapshot", "client snapshot"], ["laterRetrievalPrerequisiteIdentity", "client-final-identity"]]) {
      const input = JSON.parse(JSON.stringify(preApprovalInput())) as Mutable;
      Object.assign(input.proposedLearningDesign, { [key]: value });
      cases.push(input);
    }
    for (const input of cases) expect(() => approvePreApprovalAuthorityPackage(input)).toThrow("invalid");
  });

  it("rejects coordinated contract-content plus snapshot changes masquerading as persisted approved data", () => {
    const input = JSON.parse(JSON.stringify(preApprovalInput()));
    input.reviewedResponseEvaluationContractDraft.contract.requiredResponseElements[0].claim = "Creator-authored revised claim";
    input.reviewedResponseEvaluationContractDraft.reviewedSnapshot = JSON.stringify(input.reviewedResponseEvaluationContractDraft.contract);
    Object.assign(input.proposedLearningDesign, {
      responseEvaluationContract: input.reviewedResponseEvaluationContractDraft.contract,
      responseEvaluationContractIdentity: input.reviewedResponseEvaluationContractDraft.contract.identity,
      responseEvaluationContractSnapshot: input.reviewedResponseEvaluationContractDraft.reviewedSnapshot,
    });
    expect(() => approvePreApprovalAuthorityPackage(input)).toThrow("invalid");
  });

  it("rejects coordinated prerequisite-content plus snapshot changes masquerading as persisted approved data", () => {
    const input = JSON.parse(JSON.stringify(preApprovalInput()));
    input.reviewedLaterRetrievalPrerequisiteDraft.prerequisite.earliestEligibilityDelay.value = 7;
    input.reviewedLaterRetrievalPrerequisiteDraft.reviewedSnapshot = JSON.stringify(input.reviewedLaterRetrievalPrerequisiteDraft.prerequisite);
    Object.assign(input.proposedLearningDesign, {
      laterRetrievalPrerequisite: input.reviewedLaterRetrievalPrerequisiteDraft.prerequisite,
      laterRetrievalPrerequisiteIdentity: input.reviewedLaterRetrievalPrerequisiteDraft.prerequisite.identity,
      laterRetrievalPrerequisiteSnapshot: input.reviewedLaterRetrievalPrerequisiteDraft.reviewedSnapshot,
    });
    expect(() => approvePreApprovalAuthorityPackage(input)).toThrow("invalid");
  });

  it("preserves Creator-authored contract and prerequisite values before server approval", () => {
    const input = JSON.parse(JSON.stringify(preApprovalInput()));
    input.reviewedResponseEvaluationContractDraft.contract.requiredResponseElements[0].claim = "Creator-authored exact claim";
    input.reviewedResponseEvaluationContractDraft.contract.requiredResponseElements[0].informativeFeedback = "Creator-authored exact feedback";
    input.reviewedResponseEvaluationContractDraft.reviewedSnapshot = JSON.stringify(input.reviewedResponseEvaluationContractDraft.contract);
    input.reviewedLaterRetrievalPrerequisiteDraft.prerequisite.earliestEligibilityDelay = { value: 5, unit: "DAYS" };
    input.reviewedLaterRetrievalPrerequisiteDraft.prerequisite.creatorAuthorityReference = "creator-authored-authority";
    input.reviewedLaterRetrievalPrerequisiteDraft.reviewedSnapshot = JSON.stringify(input.reviewedLaterRetrievalPrerequisiteDraft.prerequisite);

    const approved = approvePreApprovalAuthorityPackage(input);
    expect(approved.learningDesign.responseEvaluationContract.requiredResponseElements[0]).toMatchObject({
      claim: "Creator-authored exact claim",
      informativeFeedback: "Creator-authored exact feedback",
    });
    expect(approved.learningDesign.laterRetrievalPrerequisite).toMatchObject({
      earliestEligibilityDelay: { value: 5, unit: "DAYS" },
      creatorAuthorityReference: "creator-authored-authority",
    });
  });

  it("rejects unknown fields at every nested pre-approval boundary", () => {
    const mutations = [
      (input: Mutable) => { Object.assign(input, { unknown: true }); },
      (input: Mutable) => { Object.assign(input.proposedLearningDesign.relevantContext, { unknown: true }); },
      (input: Mutable) => { Object.assign(input.reviewedResponseEvaluationContractDraft, { unknown: true }); },
      (input: Mutable) => { Object.assign(input.reviewedResponseEvaluationContractDraft.contract.supportingSource.boundary, { unknown: true }); },
      (input: Mutable) => { Object.assign(input.reviewedResponseEvaluationContractDraft.contract.requiredResponseElements[0], { unknown: true }); },
      (input: Mutable) => { Object.assign(input.reviewedLaterRetrievalPrerequisiteDraft, { unknown: true }); },
      (input: Mutable) => { Object.assign(input.reviewedLaterRetrievalPrerequisiteDraft.prerequisite.earliestEligibilityDelay, { unknown: true }); },
    ];
    for (const mutate of mutations) {
      const input = JSON.parse(JSON.stringify(preApprovalInput()));
      mutate(input);
      expect(() => approvePreApprovalAuthorityPackage(input)).toThrow("invalid");
    }
  });

  it("rejects substituted linked identities", () => {
    for (const mutate of [(i: Mutable) => { i.reviewedResponseEvaluationContractDraft.contract.proposedLearningDesignIdentity = "other"; }, (i: Mutable) => { i.reviewedResponseEvaluationContractDraft.contract.learningObjectiveIdentity = "other"; }, (i: Mutable) => { i.reviewedLaterRetrievalPrerequisiteDraft.prerequisite.relevantContextIdentity = "other"; }, (i: Mutable) => { i.reviewedLaterRetrievalPrerequisiteDraft.prerequisite.supportingSourceBoundaryIdentity = "other"; }]) {
      const input = JSON.parse(JSON.stringify(preApprovalInput())); mutate(input); expect(() => approvePreApprovalAuthorityPackage(input)).toThrow("invalid");
    }
  });

  it("preserves exact authority and rejects persisted payload tampering with unchanged digest", async () => {
    const approved = approvePreApprovalAuthorityPackage(preApprovalInput());
    const serialized = serializeApprovedAuthorityPackage(approved);
    expect(deserializeApprovedAuthorityPackage(serialized)).toEqual(approved);
    const store = new MemoryStore(); await createOnceOrReturnIdentical(store, "owner-a", approved);
    const row = store.rows.get("owner-a")!; row.serialized_package = row.serialized_package.replace("Mentalization", "Tamperization");
    await expect(requireOwnedApprovedAuthorityPackage(store, "owner-a")).rejects.toThrow("invalid");
  });

  it("isolates owner retrieval and rejects replacement", async () => {
    const store = new MemoryStore(); const approved = approvePreApprovalAuthorityPackage(preApprovalInput());
    await createOnceOrReturnIdentical(store, "owner-a", approved);
    await expect(requireOwnedApprovedAuthorityPackage(store, "owner-b")).rejects.toThrow("No approved authority package");
    const other = JSON.parse(JSON.stringify(preApprovalInput())); other.proposedLearningDesign.identity = "other-design"; other.reviewedResponseEvaluationContractDraft.contract.proposedLearningDesignIdentity = "other-design"; other.reviewedResponseEvaluationContractDraft.reviewedSnapshot = JSON.stringify(other.reviewedResponseEvaluationContractDraft.contract); other.reviewedLaterRetrievalPrerequisiteDraft.prerequisite.proposedLearningDesignIdentity = "other-design"; other.reviewedLaterRetrievalPrerequisiteDraft.reviewedSnapshot = JSON.stringify(other.reviewedLaterRetrievalPrerequisiteDraft.prerequisite);
    await expect(createOnceOrReturnIdentical(store, "owner-a", approvePreApprovalAuthorityPackage(other))).rejects.toThrow("immutable approved package already exists");
  });

  it("allows authenticated owner SELECT while granting no direct INSERT, UPDATE, or DELETE policy", () => {
    const sql = readFileSync("supabase/migrations/20260824120000_create_approved_authority_package.sql", "utf8");
    expect(sql).toContain("owner_id uuid primary key"); expect(sql).toContain("package_digest text not null"); expect(sql).toContain("enable row level security");
    expect(sql.match(/\(select auth\.uid\(\)\) = owner_id/g)).toHaveLength(1);
    expect(sql).toMatch(/for select\s+to authenticated/i);
    expect(sql).not.toMatch(/for insert|for update|for delete/i);
  });
});

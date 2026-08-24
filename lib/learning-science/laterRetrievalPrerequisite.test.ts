import { describe, expect, it } from "vitest";

import { deriveLearningDesign } from "./deriveLearningDesign";
import { requireApprovedLearningDesign } from "./learningDesignExecution";
import { approveLearningDesign, invalidateLearningDesign, rejectLearningDesign } from "./learningDesignLifecycle";
import { formLaterRetrievalPrerequisite, relevantContextIdentity, reviewLaterRetrievalPrerequisite, serializeLaterRetrievalPrerequisite } from "./laterRetrievalPrerequisite";
import { createAuthorityIdentity, formResponseEvaluationContract, reviewResponseEvaluationContract } from "./responseEvaluationContract";
import type { ApprovedLearningDesign, LaterRetrievalPrerequisite } from "./types";

function proposal() {
  return deriveLearningDesign({ learningObjective: { statement: "Explain mentalization." }, relevantContext: { description: "Bounded context.", durableRetentionOfPreviouslyAcquiredKnowledgeIntended: true } });
}

function authority(design = proposal()) {
  const context = "Source context";
  const boundary = { startOffset: 0, endOffset: context.length };
  const contract = formResponseEvaluationContract(design, {
    identity: "contract-1", learningObjectiveIdentity: design.learningObjectiveIdentity,
    supportingSource: { identity: createAuthorityIdentity("source", { context, boundary }), boundary },
    correctionRequirementReference: design.feedbackResultRequirement.description,
    requiredResponseElements: [{ identity: "element-1", claim: "Mentalization concerns mental states.", acceptedFormulations: ["mental states"], contradictingFormulations: [], informativeFeedback: "Include mental states." }],
  }, context);
  const input = {
    identity: "later-1", proposedLearningDesignIdentity: design.identity, learningObjectiveIdentity: design.learningObjectiveIdentity,
    relevantContextIdentity: relevantContextIdentity(design), supportingSourceBoundaryIdentity: contract.supportingSource.identity,
    earliestEligibilityDelay: { value: 36, unit: "HOURS" as const }, creatorAuthorityReference: "creator-1",
  };
  return { design, contract, input };
}

function approvedPair() {
  const { design, contract, input } = authority();
  const prerequisite = formLaterRetrievalPrerequisite(design, input);
  return approveLearningDesign(design, reviewResponseEvaluationContract(design, contract, true), reviewLaterRetrievalPrerequisite(design, prerequisite, true));
}

function reconstructApproved(
  approved: ApprovedLearningDesign,
  change: Partial<LaterRetrievalPrerequisite>,
) {
  const prerequisite = {
    ...approved.laterRetrievalPrerequisite,
    ...change,
  };
  Object.freeze(prerequisite.earliestEligibilityDelay);
  Object.freeze(prerequisite);
  return Object.freeze({
    ...approved,
    laterRetrievalPrerequisiteSnapshot: serializeLaterRetrievalPrerequisite(prerequisite),
    laterRetrievalPrerequisite: prerequisite,
  });
}

describe("Later Retrieval Prerequisite approval binding", () => {
  it("forms and atomically exposes one exact immutable same-version approved pair", () => {
    const approved = requireApprovedLearningDesign(approvedPair());
    expect(approved.laterRetrievalPrerequisite).toMatchObject({ principleReference: "DISTRIBUTED_PRACTICE", repeatedLearningOpportunitiesRequired: true, earliestEligibilityDelay: { value: 36, unit: "HOURS" }, creatorAuthorityReference: "creator-1" });
    expect(approved.laterRetrievalPrerequisite.creatorApprovalEvent).toEqual(expect.any(String));
    expect(approved.laterRetrievalPrerequisite.proposedLearningDesignIdentity).toBe(approved.identity);
    expect(approved.laterRetrievalPrerequisite.learningObjectiveIdentity).toBe(approved.learningObjectiveIdentity);
    expect(approved.laterRetrievalPrerequisite.supportingSourceBoundaryIdentity).toBe(approved.responseEvaluationContract.supportingSource.identity);
    expect(Object.isFrozen(approved.laterRetrievalPrerequisite)).toBe(true);
    expect(Object.isFrozen(approved.laterRetrievalPrerequisite.earliestEligibilityDelay)).toBe(true);
    expect(approved).not.toHaveProperty("eligibility");
    expect(approved).not.toHaveProperty("dueAt");
    expect(approved).not.toHaveProperty("consumed");
    expect(approved).not.toHaveProperty("laterRetrievalOpportunity");
  });

  it.each([
    ["missing identity", { identity: "" }, "stable identity"],
    ["missing source", { supportingSourceBoundaryIdentity: "" }, "supporting source boundary identity"],
    ["missing authority", { creatorAuthorityReference: "" }, "authority reference"],
    ["wrong design", { proposedLearningDesignIdentity: "other" }, "same Proposed Learning Design"],
    ["wrong objective", { learningObjectiveIdentity: "other" }, "Learning Objective does not match"],
    ["wrong context", { relevantContextIdentity: "other" }, "Relevant Context does not match"],
    ["zero timing", { earliestEligibilityDelay: { value: 0, unit: "DAYS" as const } }, "positive whole number"],
    ["fractional timing", { earliestEligibilityDelay: { value: 1.5, unit: "DAYS" as const } }, "positive whole number"],
    ["unsupported unit", { earliestEligibilityDelay: { value: 1, unit: "WEEKS" as "DAYS" } }, "HOURS or DAYS"],
  ] as const)("rejects %s", (_name, change, message) => {
    const { design, input } = authority();
    expect(() => formLaterRetrievalPrerequisite(design, { ...input, ...change })).toThrow(message);
  });

  it("takes Distributed Practice applicability from the Learning Science design and creates the approval event only during approval", () => {
    const { design, contract, input } = authority();
    expect(design.distributedPracticeApplicability).toEqual({
      principleReference: "DISTRIBUTED_PRACTICE",
      repeatedLearningOpportunitiesRequired: true,
    });
    const prerequisite = formLaterRetrievalPrerequisite(design, input);
    expect(prerequisite).toMatchObject(design.distributedPracticeApplicability);
    expect(prerequisite).not.toHaveProperty("creatorApprovalEvent");

    const approved = approveLearningDesign(
      design,
      reviewResponseEvaluationContract(design, contract, true),
      reviewLaterRetrievalPrerequisite(design, prerequisite, true),
    );
    expect(approved.laterRetrievalPrerequisite.creatorApprovalEvent).toEqual(expect.any(String));
    expect(approved.laterRetrievalPrerequisiteSnapshot).toContain(approved.laterRetrievalPrerequisite.creatorApprovalEvent);
  });

  it("rejects absent, unreviewed, changed-after-review, cross-design, and substituted prerequisite authority", () => {
    const { design, contract, input } = authority();
    const reviewedContract = reviewResponseEvaluationContract(design, contract, true);
    const prerequisite = formLaterRetrievalPrerequisite(design, input);
    expect(() => approveLearningDesign(design, reviewedContract)).toThrow("exact reviewed Later Retrieval Prerequisite");
    expect(() => reviewLaterRetrievalPrerequisite(design, prerequisite, false)).toThrow("Explicit Creator review");
    const reviewed = reviewLaterRetrievalPrerequisite(design, prerequisite, true);
    prerequisite.earliestEligibilityDelay.value = 48;
    expect(() => approveLearningDesign(design, reviewedContract, reviewed)).toThrow("changed after Creator review");

    const other = proposal();
    expect(() => reviewLaterRetrievalPrerequisite(other, { ...prerequisite, earliestEligibilityDelay: { value: 36, unit: "HOURS" } }, true)).toThrow("same Proposed Learning Design");
    const wrongSource = formLaterRetrievalPrerequisite(design, { ...input, supportingSourceBoundaryIdentity: "source-other" });
    expect(() => approveLearningDesign(design, reviewedContract, reviewLaterRetrievalPrerequisite(design, wrongSource, true))).toThrow("supporting source boundary does not match");

    const approved = approvedPair();
    const substituted = Object.freeze({ ...approved, laterRetrievalPrerequisite: Object.freeze({ ...approved.laterRetrievalPrerequisite, earliestEligibilityDelay: Object.freeze({ value: 99, unit: "DAYS" as const }) }) });
    expect(() => requireApprovedLearningDesign(substituted)).toThrow("APPROVED learning design");
  });

  it.each([
    ["Relevant Context identity", { relevantContextIdentity: "context-other" }],
    ["Distributed Practice reference", { principleReference: "OTHER" as "DISTRIBUTED_PRACTICE" }],
    ["positive applicability", { repeatedLearningOpportunitiesRequired: false as true }],
    ["positive timing value", { earliestEligibilityDelay: { value: 0, unit: "HOURS" as const } }],
    ["supported timing unit", { earliestEligibilityDelay: { value: 36, unit: "WEEKS" as "HOURS" } }],
    ["Creator authority reference", { creatorAuthorityReference: " " }],
    ["Creator approval event", { creatorApprovalEvent: " " }],
  ] as const)("rejects a reconstructed APPROVED object with invalid %s", (_name, change) => {
    const reconstructed = reconstructApproved(approvedPair(), change);

    expect(() => requireApprovedLearningDesign(reconstructed)).toThrow("APPROVED learning design");
  });

  it("discards authority on rejection and invalidation and requires fresh formation for a fresh proposal", () => {
    const approved = approvedPair();
    const invalidated = invalidateLearningDesign(approved);
    expect(invalidated).not.toHaveProperty("laterRetrievalPrerequisiteIdentity");
    expect(invalidated).not.toHaveProperty("laterRetrievalPrerequisiteSnapshot");
    expect(invalidated).not.toHaveProperty("laterRetrievalPrerequisite");
    expect(() => requireApprovedLearningDesign(invalidated)).toThrow("APPROVED learning design");
    const fresh = proposal();
    expect(fresh.identity).not.toBe(approved.identity);
    expect(() => approveLearningDesign(fresh)).toThrow("exact reviewed Response Evaluation Contract");
    expect(rejectLearningDesign(fresh)).not.toHaveProperty("laterRetrievalPrerequisite");
  });
});

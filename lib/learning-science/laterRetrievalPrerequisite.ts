import { createAuthorityIdentity } from "./responseEvaluationContract";
import type { LaterRetrievalPrerequisite, LaterRetrievalPrerequisiteDraft, ProposedLearningDesign } from "./types";

export interface LaterRetrievalPrerequisiteInput {
  identity: string;
  proposedLearningDesignIdentity: string;
  learningObjectiveIdentity: string;
  relevantContextIdentity: string;
  supportingSourceBoundaryIdentity: string;
  earliestEligibilityDelay: { value: number; unit: "HOURS" | "DAYS" };
  creatorAuthorityReference: string;
}

export interface ReviewedLaterRetrievalPrerequisite {
  prerequisite: LaterRetrievalPrerequisiteDraft;
  reviewedSnapshot: string;
  completePrerequisiteConfirmed: true;
}

function snapshot(value: LaterRetrievalPrerequisite | LaterRetrievalPrerequisiteDraft) {
  return JSON.stringify(value);
}

function assertText(value: string, field: string) {
  if (typeof value !== "string" || !value.trim()) throw new Error(`Later Retrieval Prerequisite requires ${field}.`);
}

export function relevantContextIdentity(design: ProposedLearningDesign) {
  return createAuthorityIdentity("context", design.relevantContext);
}

export function validateLaterRetrievalPrerequisite(
  design: ProposedLearningDesign,
  prerequisite: LaterRetrievalPrerequisite | LaterRetrievalPrerequisiteDraft,
) {
  assertText(prerequisite.identity, "a stable identity");
  assertText(prerequisite.supportingSourceBoundaryIdentity, "a supporting source boundary identity");
  assertText(prerequisite.creatorAuthorityReference, "a Creator/Content Owner authority reference");
  if (prerequisite.proposedLearningDesignIdentity !== design.identity) throw new Error("Later Retrieval Prerequisite must reference the same Proposed Learning Design.");
  if (prerequisite.learningObjectiveIdentity !== design.learningObjectiveIdentity) throw new Error("Later Retrieval Prerequisite Learning Objective does not match the Proposed Learning Design.");
  if (prerequisite.relevantContextIdentity !== relevantContextIdentity(design)) throw new Error("Later Retrieval Prerequisite Relevant Context does not match the Proposed Learning Design.");
  if (prerequisite.principleReference !== "DISTRIBUTED_PRACTICE") throw new Error("Later Retrieval Prerequisite requires the certified Distributed Practice reference.");
  if (prerequisite.repeatedLearningOpportunitiesRequired !== true) throw new Error("Later Retrieval Prerequisite requires the authoritative positive applicability determination.");
  if (!Number.isInteger(prerequisite.earliestEligibilityDelay.value) || prerequisite.earliestEligibilityDelay.value <= 0) throw new Error("Later Retrieval Prerequisite timing must be a positive whole number.");
  if (prerequisite.earliestEligibilityDelay.unit !== "HOURS" && prerequisite.earliestEligibilityDelay.unit !== "DAYS") throw new Error("Later Retrieval Prerequisite timing unit must be HOURS or DAYS.");
}

export function formLaterRetrievalPrerequisite(
  design: ProposedLearningDesign,
  input: LaterRetrievalPrerequisiteInput,
): LaterRetrievalPrerequisiteDraft {
  const prerequisite = structuredClone({
    ...input,
    ...design.distributedPracticeApplicability,
  });
  validateLaterRetrievalPrerequisite(design, prerequisite);
  return prerequisite;
}

export function reviewLaterRetrievalPrerequisite(
  design: ProposedLearningDesign,
  prerequisite: LaterRetrievalPrerequisiteDraft,
  completePrerequisiteConfirmed: boolean,
): ReviewedLaterRetrievalPrerequisite {
  if (!completePrerequisiteConfirmed) throw new Error("Explicit Creator review of the complete Later Retrieval Prerequisite is required before approval.");
  validateLaterRetrievalPrerequisite(design, prerequisite);
  return { prerequisite, reviewedSnapshot: snapshot(prerequisite), completePrerequisiteConfirmed: true };
}

export function assertReviewedLaterRetrievalPrerequisiteIsCurrent(
  design: ProposedLearningDesign,
  reviewed: ReviewedLaterRetrievalPrerequisite,
) {
  validateLaterRetrievalPrerequisite(design, reviewed.prerequisite);
  if (reviewed.reviewedSnapshot !== snapshot(reviewed.prerequisite)) throw new Error("Later Retrieval Prerequisite changed after Creator review.");
}

export function immutableLaterRetrievalPrerequisiteSnapshot(value: LaterRetrievalPrerequisite) {
  const copy = structuredClone(value);
  Object.freeze(copy.earliestEligibilityDelay);
  return Object.freeze(copy);
}

export function bindLaterRetrievalPrerequisiteToCreatorApproval(
  draft: LaterRetrievalPrerequisiteDraft,
): LaterRetrievalPrerequisite {
  return { ...structuredClone(draft), creatorApprovalEvent: crypto.randomUUID() };
}

export function serializeLaterRetrievalPrerequisite(value: LaterRetrievalPrerequisite) {
  return snapshot(value);
}

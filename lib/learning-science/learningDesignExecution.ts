import type { ApprovedLearningDesign, LearningDesign } from "./types";
import { createAuthorityIdentity, serializeContractSnapshot } from "./responseEvaluationContract";
import { serializeLaterRetrievalPrerequisite } from "./laterRetrievalPrerequisite";

function hasValidBoundLaterRetrievalPrerequisite(
  design: ApprovedLearningDesign,
) {
  const prerequisite = design.laterRetrievalPrerequisite;

  return prerequisite.relevantContextIdentity === createAuthorityIdentity("context", design.relevantContext) &&
    prerequisite.principleReference === "DISTRIBUTED_PRACTICE" &&
    prerequisite.repeatedLearningOpportunitiesRequired === true &&
    Number.isInteger(prerequisite.earliestEligibilityDelay.value) &&
    prerequisite.earliestEligibilityDelay.value > 0 &&
    (prerequisite.earliestEligibilityDelay.unit === "HOURS" ||
      prerequisite.earliestEligibilityDelay.unit === "DAYS") &&
    typeof prerequisite.creatorAuthorityReference === "string" &&
    Boolean(prerequisite.creatorAuthorityReference.trim()) &&
    typeof prerequisite.creatorApprovalEvent === "string" &&
    Boolean(prerequisite.creatorApprovalEvent.trim());
}

export function canExecuteLearningDesign(
  design: LearningDesign,
): design is ApprovedLearningDesign {
  return design.state === "APPROVED" &&
    Boolean(design.responseEvaluationContract) &&
    Object.isFrozen(design) &&
    Object.isFrozen(design.responseEvaluationContract) &&
    design.responseEvaluationContractIdentity === design.responseEvaluationContract.identity &&
    design.responseEvaluationContractSnapshot === serializeContractSnapshot(design.responseEvaluationContract) &&
    design.responseEvaluationContract.proposedLearningDesignIdentity === design.identity &&
    Boolean(design.laterRetrievalPrerequisite) &&
    Object.isFrozen(design.laterRetrievalPrerequisite) &&
    Object.isFrozen(design.laterRetrievalPrerequisite.earliestEligibilityDelay) &&
    design.laterRetrievalPrerequisiteIdentity === design.laterRetrievalPrerequisite.identity &&
    design.laterRetrievalPrerequisiteSnapshot === serializeLaterRetrievalPrerequisite(design.laterRetrievalPrerequisite) &&
    design.laterRetrievalPrerequisite.proposedLearningDesignIdentity === design.identity &&
    design.laterRetrievalPrerequisite.learningObjectiveIdentity === design.learningObjectiveIdentity &&
    design.laterRetrievalPrerequisite.supportingSourceBoundaryIdentity === design.responseEvaluationContract.supportingSource.identity &&
    hasValidBoundLaterRetrievalPrerequisite(design);
}

export function requireApprovedLearningDesign(
  design: LearningDesign,
): ApprovedLearningDesign {
  if (!canExecuteLearningDesign(design)) {
    throw new Error(
      "Learner execution requires an APPROVED learning design.",
    );
  }

  return design;
}

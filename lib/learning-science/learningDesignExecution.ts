import type { ApprovedLearningDesign, LearningDesign } from "./types";
import { serializeContractSnapshot } from "./responseEvaluationContract";

export function canExecuteLearningDesign(
  design: LearningDesign,
): design is ApprovedLearningDesign {
  return design.state === "APPROVED" &&
    Boolean(design.responseEvaluationContract) &&
    Object.isFrozen(design) &&
    Object.isFrozen(design.responseEvaluationContract) &&
    design.responseEvaluationContractIdentity === design.responseEvaluationContract.identity &&
    design.responseEvaluationContractSnapshot === serializeContractSnapshot(design.responseEvaluationContract) &&
    design.responseEvaluationContract.proposedLearningDesignIdentity === design.identity;
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

import type { ApprovedLearningDesign, LearningDesign } from "./types";

export function canExecuteLearningDesign(
  design: LearningDesign,
): design is ApprovedLearningDesign {
  return design.state === "APPROVED";
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

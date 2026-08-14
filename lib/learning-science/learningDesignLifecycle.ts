import type {
  ApprovedLearningDesign,
  InvalidatedLearningDesign,
  ProposedLearningDesign,
} from "./types";

export function approveLearningDesign(
  design: ProposedLearningDesign,
): ApprovedLearningDesign {
  return {
    ...design,
    state: "APPROVED",
  };
}

export function invalidateLearningDesign(
  design: ProposedLearningDesign | ApprovedLearningDesign,
): InvalidatedLearningDesign {
  return {
    ...design,
    state: "INVALIDATED",
  };
}

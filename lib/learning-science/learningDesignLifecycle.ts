import type {
  ApprovedLearningDesign,
  InvalidatedLearningDesign,
  ProposedLearningDesign,
  RejectedLearningDesign,
} from "./types";

export function approveLearningDesign(
  design: ProposedLearningDesign,
): ApprovedLearningDesign {
  return {
    ...design,
    state: "APPROVED",
  };
}

export function rejectLearningDesign(
  design: ProposedLearningDesign,
): RejectedLearningDesign {
  return {
    ...design,
    state: "REJECTED",
  };
}

export function invalidateLearningDesign(
  design:
    | ProposedLearningDesign
    | ApprovedLearningDesign
    | RejectedLearningDesign,
): InvalidatedLearningDesign {
  return {
    ...design,
    state: "INVALIDATED",
  };
}

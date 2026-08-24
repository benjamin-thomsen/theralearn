import type {
  ApprovedLearningDesign,
  InvalidatedLearningDesign,
  ProposedLearningDesign,
  RejectedLearningDesign,
} from "./types";
import { assertReviewedContractIsCurrent, immutableContractSnapshot, serializeContractSnapshot, type ReviewedResponseEvaluationContract } from "./responseEvaluationContract";

export function approveLearningDesign(
  design: ProposedLearningDesign,
  reviewedContract?: ReviewedResponseEvaluationContract,
): ApprovedLearningDesign {
  if (!reviewedContract) throw new Error("Learning Design approval requires the exact reviewed Response Evaluation Contract.");
  assertReviewedContractIsCurrent(design, reviewedContract);
  const responseEvaluationContract = immutableContractSnapshot(reviewedContract.contract);
  const approved = {
    ...design,
    state: "APPROVED" as const,
    responseEvaluationContractIdentity: responseEvaluationContract.identity,
    responseEvaluationContractSnapshot: serializeContractSnapshot(responseEvaluationContract),
    responseEvaluationContract,
  };
  Object.freeze(approved.learningObjective);
  Object.freeze(approved.relevantContext);
  Object.freeze(approved.applicablePrinciples);
  for (const requirement of approved.learningRequirements) Object.freeze(requirement);
  Object.freeze(approved.learningRequirements);
  Object.freeze(approved.proposedLearningMechanism);
  Object.freeze(approved.learnerPerformanceRequirement);
  Object.freeze(approved.feedbackResultRequirement);
  for (const decision of approved.creatorControlledDecisions) Object.freeze(decision);
  Object.freeze(approved.creatorControlledDecisions);
  return Object.freeze(approved);
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

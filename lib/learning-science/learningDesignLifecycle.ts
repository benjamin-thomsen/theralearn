import type {
  ApprovedLearningDesign,
  InvalidatedLearningDesign,
  ProposedLearningDesign,
  RejectedLearningDesign,
} from "./types";
import { assertReviewedContractIsCurrent, immutableContractSnapshot, serializeContractSnapshot, type ReviewedResponseEvaluationContract } from "./responseEvaluationContract";
import { assertReviewedLaterRetrievalPrerequisiteIsCurrent, bindLaterRetrievalPrerequisiteToCreatorApproval, immutableLaterRetrievalPrerequisiteSnapshot, serializeLaterRetrievalPrerequisite, type ReviewedLaterRetrievalPrerequisite } from "./laterRetrievalPrerequisite";

export function approveLearningDesign(
  design: ProposedLearningDesign,
  reviewedContract?: ReviewedResponseEvaluationContract,
  reviewedLaterRetrievalPrerequisite?: ReviewedLaterRetrievalPrerequisite,
): ApprovedLearningDesign {
  if (!reviewedContract) throw new Error("Learning Design approval requires the exact reviewed Response Evaluation Contract.");
  assertReviewedContractIsCurrent(design, reviewedContract);
  if (!reviewedLaterRetrievalPrerequisite) throw new Error("Learning Design approval requires the exact reviewed Later Retrieval Prerequisite.");
  assertReviewedLaterRetrievalPrerequisiteIsCurrent(design, reviewedLaterRetrievalPrerequisite);
  if (reviewedLaterRetrievalPrerequisite.prerequisite.supportingSourceBoundaryIdentity !== reviewedContract.contract.supportingSource.identity) throw new Error("Later Retrieval Prerequisite supporting source boundary does not match the reviewed Response Evaluation Contract.");
  const responseEvaluationContract = immutableContractSnapshot(reviewedContract.contract);
  const laterRetrievalPrerequisite = immutableLaterRetrievalPrerequisiteSnapshot(
    bindLaterRetrievalPrerequisiteToCreatorApproval(reviewedLaterRetrievalPrerequisite.prerequisite),
  );
  const approved = {
    ...design,
    state: "APPROVED" as const,
    responseEvaluationContractIdentity: responseEvaluationContract.identity,
    responseEvaluationContractSnapshot: serializeContractSnapshot(responseEvaluationContract),
    responseEvaluationContract,
    laterRetrievalPrerequisiteIdentity: laterRetrievalPrerequisite.identity,
    laterRetrievalPrerequisiteSnapshot: serializeLaterRetrievalPrerequisite(laterRetrievalPrerequisite),
    laterRetrievalPrerequisite,
  };
  Object.freeze(approved.learningObjective);
  Object.freeze(approved.relevantContext);
  Object.freeze(approved.applicablePrinciples);
  Object.freeze(approved.distributedPracticeApplicability);
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
  const {
    laterRetrievalPrerequisite: _laterRetrievalPrerequisite,
    laterRetrievalPrerequisiteIdentity: _laterRetrievalPrerequisiteIdentity,
    laterRetrievalPrerequisiteSnapshot: _laterRetrievalPrerequisiteSnapshot,
    ...unboundDesign
  } = design as typeof design & Partial<ApprovedLearningDesign>;
  void _laterRetrievalPrerequisite;
  void _laterRetrievalPrerequisiteIdentity;
  void _laterRetrievalPrerequisiteSnapshot;
  return {
    ...unboundDesign,
    state: "INVALIDATED",
  };
}

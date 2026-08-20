import type { SupportingSourceBoundary } from "./extractSourceMaterial";

export interface ObjectiveProposal {
  state: "PROPOSED";
  statement: string;
  supportingSourceBoundary: SupportingSourceBoundary;
}

export function createObjectiveProposal(
  statement: string,
  supportingSourceBoundary: SupportingSourceBoundary,
): ObjectiveProposal {
  const normalizedStatement = statement.trim();

  if (!normalizedStatement) {
    throw new Error("Objective proposal requires a non-empty statement.");
  }

  return {
    state: "PROPOSED",
    statement: normalizedStatement,
    supportingSourceBoundary,
  };
}

export interface CreatorControlledObjectiveCandidate {
  state: "CREATOR_CONTROLLED";
  statement: string;
  supportingSourceBoundary: SupportingSourceBoundary;
  sourceGroundingState: "INVALIDATED";
}

export function changeObjectiveProposal(
  proposal: ObjectiveProposal,
  statement: string,
): CreatorControlledObjectiveCandidate {
  return {
    state: "CREATOR_CONTROLLED",
    statement: statement.trim(),
    supportingSourceBoundary: proposal.supportingSourceBoundary,
    sourceGroundingState: "INVALIDATED",
  };
}

export interface SourceGroundingReassessment {
  sourceGroundingReassessed: true;
}

export interface ReviewableObjectiveCandidate {
  state: "REVIEWABLE";
  statement: string;
  supportingSourceBoundary: SupportingSourceBoundary;
  sourceGroundingState: "REASSESSED";
}

export function makeObjectiveCandidateReviewable(
  candidate: CreatorControlledObjectiveCandidate,
  reassessment: SourceGroundingReassessment,
): ReviewableObjectiveCandidate {
  return {
    state: "REVIEWABLE",
    statement: candidate.statement,
    supportingSourceBoundary: candidate.supportingSourceBoundary,
    sourceGroundingState: "REASSESSED",
  };
}

export interface RejectedObjectiveCandidate {
  state: "REJECTED";
  statement: string;
  supportingSourceBoundary: SupportingSourceBoundary;
}

export function rejectObjectiveCandidate(
  candidate: ReviewableObjectiveCandidate,
): RejectedObjectiveCandidate {
  return {
    state: "REJECTED",
    statement: candidate.statement,
    supportingSourceBoundary: candidate.supportingSourceBoundary,
  };
}

export interface AcceptedLearningObjective {
  state: "ACCEPTED";
  statement: string;
  supportingSourceBoundary: SupportingSourceBoundary;
}

export function approveObjectiveCandidate(
  candidate: ReviewableObjectiveCandidate,
): AcceptedLearningObjective {
  return {
    state: "ACCEPTED",
    statement: candidate.statement,
    supportingSourceBoundary: candidate.supportingSourceBoundary,
  };
}

import type { ExtractedSourceMaterial, SupportingSourceBoundary } from "./extractSourceMaterial";
import { createObjectiveProposal } from "./objectiveProposal";

export interface ObjectiveAnalysisCandidate {
  statement: string;
  supportingSourceBoundary: SupportingSourceBoundary;
}

export interface ObjectiveAnalysisProvider {
  analyzeObjective(
    sourceMaterial: ExtractedSourceMaterial,
  ): Promise<ObjectiveAnalysisCandidate>;
}

export function validateObjectiveAnalysisCandidate(
  candidate: ObjectiveAnalysisCandidate,
  sourceMaterial: ExtractedSourceMaterial,
) {
  const { startOffset, endOffset } = candidate.supportingSourceBoundary;

  if (!candidate.statement.trim()) {
    throw new Error("Objective analysis requires a non-empty statement.");
  }

  if (!Number.isInteger(startOffset) || !Number.isInteger(endOffset) || startOffset < 0 || endOffset <= startOffset || endOffset > sourceMaterial.text.length) {
    throw new Error("Objective analysis requires valid supporting source grounding.");
  }

  return createObjectiveProposal(candidate.statement, candidate.supportingSourceBoundary);
}

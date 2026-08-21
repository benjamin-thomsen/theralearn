import type { ExtractedSourceMaterial } from "./extractSourceMaterial";
import type {
  CreatorControlledObjectiveCandidate,
  SourceGroundingReassessment,
} from "./objectiveProposal";

export interface SourceGroundingReassessmentProvider {
  reassessSourceGrounding(
    candidate: CreatorControlledObjectiveCandidate,
    sourceMaterial: ExtractedSourceMaterial,
  ): Promise<SourceGroundingReassessment>;
}


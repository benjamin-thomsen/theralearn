import { rejectLearningDesign } from "../../lib/learning-science/learningDesignLifecycle";
import type {
  LaterRetrievalPrerequisiteDraft,
  ProposedLearningDesign,
} from "../../lib/learning-science/types";

export function rejectLearningDesignReview(
  design: ProposedLearningDesign,
  prerequisiteDraft: LaterRetrievalPrerequisiteDraft | null,
) {
  void prerequisiteDraft;
  return {
    learningDesign: rejectLearningDesign(design),
    laterRetrievalPrerequisite: null,
  } as const;
}

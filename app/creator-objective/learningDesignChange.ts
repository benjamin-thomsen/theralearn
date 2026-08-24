import { invalidateLearningDesign } from "../../lib/learning-science/learningDesignLifecycle";
import type { LearningDesign } from "../../lib/learning-science/types";
import { handoffToLearningScience } from "../../lib/subject-matter-intake/handoffToLearningScience";
import {
  formBoundedRelevantContext,
  type AcceptedObjectiveWithRelevantContext,
} from "../../lib/subject-matter-intake/relevantContext";

export function changeRelevantContextDescription(
  acceptedHandoff: AcceptedObjectiveWithRelevantContext,
  currentDesign: LearningDesign,
  description: string,
) {
  return {
    acceptedHandoff,
    changedDescription: description,
    invalidatedDesign:
      currentDesign.state === "INVALIDATED"
        ? currentDesign
        : invalidateLearningDesign(currentDesign),
  };
}

export function rederiveLearningDesignFromChangedDescription(
  acceptedHandoff: AcceptedObjectiveWithRelevantContext,
  description: string,
) {
  const freshHandoff = formBoundedRelevantContext(
    acceptedHandoff.acceptedLearningObjective,
    description,
    acceptedHandoff.relevantContext
      .durableRetentionOfPreviouslyAcquiredKnowledgeIntended,
  );

  return {
    acceptedHandoff: freshHandoff,
    learningDesign: handoffToLearningScience(freshHandoff),
  };
}

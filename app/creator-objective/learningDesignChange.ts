import { invalidateLearningDesign } from "../../lib/learning-science/learningDesignLifecycle";
import { ActiveRetrievalNotApplicableError } from "../../lib/learning-science/deriveLearningDesign";
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

export interface ActiveRetrievalNonApplicableOutcome {
  kind: "ACTIVE_RETRIEVAL_NON_APPLICABLE";
  message: string;
}

export function changeDurableRetentionPremise(
  acceptedHandoff: AcceptedObjectiveWithRelevantContext,
  currentDesign: Exclude<LearningDesign, { state: "INVALIDATED" }>,
) {
  if (
    !acceptedHandoff.relevantContext
      .durableRetentionOfPreviouslyAcquiredKnowledgeIntended
  ) {
    throw new Error(
      "Durable-retention premise change requires an accepted true premise.",
    );
  }

  return {
    acceptedHandoff,
    changedDurableRetentionPremise: false as const,
    invalidatedDesign: invalidateLearningDesign(currentDesign),
  };
}

export function deriveOutcomeFromChangedDurableRetentionPremise(
  acceptedHandoff: AcceptedObjectiveWithRelevantContext,
): {
  acceptedHandoff: AcceptedObjectiveWithRelevantContext;
  outcome: ActiveRetrievalNonApplicableOutcome;
} {
  const changedHandoff = formBoundedRelevantContext(
    acceptedHandoff.acceptedLearningObjective,
    acceptedHandoff.relevantContext.description,
    false,
  );

  try {
    handoffToLearningScience(changedHandoff);
  } catch (cause) {
    if (cause instanceof ActiveRetrievalNotApplicableError) {
      return {
        acceptedHandoff: changedHandoff,
        outcome: {
          kind: "ACTIVE_RETRIEVAL_NON_APPLICABLE",
          message: cause.message,
        },
      };
    }

    throw cause;
  }

  throw new Error(
    "Changed durable-retention premises unexpectedly produced a Learning Design.",
  );
}

import type { AcceptedLearningObjective } from "./objectiveProposal";

export interface BoundedRelevantContext {
  description: string;
  durableRetentionOfPreviouslyAcquiredKnowledgeIntended: boolean;
}

export interface AcceptedObjectiveWithRelevantContext {
  acceptedLearningObjective: AcceptedLearningObjective;
  relevantContext: BoundedRelevantContext;
}

export function formBoundedRelevantContext(
  acceptedLearningObjective: AcceptedLearningObjective,
  description: string,
  durableRetentionOfPreviouslyAcquiredKnowledgeIntended: boolean,
): AcceptedObjectiveWithRelevantContext {
  const normalizedDescription = description.trim();

  if (!normalizedDescription) {
    throw new Error("Bounded Relevant Context requires an explicit description.");
  }

  return {
    acceptedLearningObjective,
    relevantContext: {
      description: normalizedDescription,
      durableRetentionOfPreviouslyAcquiredKnowledgeIntended,
    },
  };
}

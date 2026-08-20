import { deriveLearningDesign } from "../learning-science/deriveLearningDesign";
import type { ProposedLearningDesign } from "../learning-science/types";
import type { AcceptedObjectiveWithRelevantContext } from "./relevantContext";

export function handoffToLearningScience(
  acceptedHandoff: AcceptedObjectiveWithRelevantContext,
): ProposedLearningDesign {
  return deriveLearningDesign({
    learningObjective: {
      statement: acceptedHandoff.acceptedLearningObjective.statement,
    },
    relevantContext: acceptedHandoff.relevantContext,
  });
}

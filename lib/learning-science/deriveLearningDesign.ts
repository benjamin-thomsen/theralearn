import type {
  LearningObjective,
  ProposedLearningDesign,
  RelevantContext,
} from "./types";

export interface DeriveLearningDesignInput {
  learningObjective: LearningObjective;
  relevantContext: RelevantContext;
}

export function deriveLearningDesign({
  learningObjective,
  relevantContext,
}: DeriveLearningDesignInput): ProposedLearningDesign {
  return {
    learningObjective,
    relevantContext,
    applicablePrinciples: ["active-retrieval"],
    learningScienceRationale:
      "Active retrieval applies because the objective requires durable recall of previously introduced knowledge.",
    learningRequirements: [
      {
        description:
          "The learner must actively retrieve the relevant information before reveal.",
      },
    ],
    proposedLearningMechanism: {
      kind: "bounded-retrieval",
      description:
        "One bounded retrieval interaction requiring an active response before reveal.",
    },
    learnerPerformanceRequirement: {
      description:
        "The learner must produce one active response before seeing the correct information.",
    },
    feedbackResultRequirement: {
      description:
        "After the attempt, provide relevant correctness information and bounded correction where required.",
    },
    creatorControlledDecisions: [
      {
        description:
          "The creator must explicitly approve the proposed learning design before learner execution.",
      },
    ],
    state: "PROPOSED",
  };
}

import type {
  LearningObjective,
  ProposedLearningDesign,
  RelevantContext,
} from "./types";
import { createAuthorityIdentity } from "./responseEvaluationContract";

export interface DeriveLearningDesignInput {
  learningObjective: LearningObjective;
  relevantContext: RelevantContext;
}

export class ActiveRetrievalNotApplicableError extends Error {
  constructor() {
    super(
      "Active Retrieval is not applicable unless durable retention of previously acquired knowledge is an intended learning outcome.",
    );
    this.name = "ActiveRetrievalNotApplicableError";
  }
}

function assertBoundedRetrievalApplicability({
  learningObjective,
  relevantContext,
}: DeriveLearningDesignInput) {
  if (!learningObjective.statement.trim()) {
    throw new Error(
      "Active Retrieval applicability requires an explicit Learning Objective.",
    );
  }

  if (!relevantContext.description.trim()) {
    throw new Error(
      "Active Retrieval applicability requires explicit Relevant Context.",
    );
  }

  if (!relevantContext.durableRetentionOfPreviouslyAcquiredKnowledgeIntended) {
    throw new ActiveRetrievalNotApplicableError();
  }
}

export function deriveLearningDesign({
  learningObjective,
  relevantContext,
}: DeriveLearningDesignInput): ProposedLearningDesign {
  assertBoundedRetrievalApplicability({
    learningObjective,
    relevantContext,
  });

  const learningRequirements = [
    {
      description:
        "The learner must actively retrieve the relevant information before reveal.",
    },
  ];

  return {
    identity: crypto.randomUUID(),
    learningObjectiveIdentity: createAuthorityIdentity("objective", learningObjective.statement),
    learningObjective,
    relevantContext,
    applicablePrinciples: ["active-retrieval"],
    learningScienceRationale:
      "Active Retrieval applies because durable retention of previously acquired knowledge is explicitly represented as an intended learning outcome in the Relevant Context.",
    learningRequirements,
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

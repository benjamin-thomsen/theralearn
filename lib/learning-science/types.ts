export type LearningDesignState =
  | "PROPOSED"
  | "APPROVED"
  | "REJECTED"
  | "INVALIDATED";

export type CertifiedLearningPrincipleReference = "active-retrieval";

export type LearningMechanismKind = "bounded-retrieval";

export interface LearningObjective {
  statement: string;
}

export interface RelevantContext {
  description: string;
  durableRetentionOfPreviouslyAcquiredKnowledgeIntended: boolean;
}

export interface LearningRequirement {
  description: string;
}

export interface ProposedLearningMechanism {
  kind: LearningMechanismKind;
  description: string;
}

export interface LearnerPerformanceRequirement {
  description: string;
}

export interface FeedbackResultRequirement {
  description: string;
}

export interface CreatorControlledDecision {
  description: string;
}

export interface SupportingSourceReference {
  identity: string;
  boundary: {
    startOffset: number;
    endOffset: number;
  };
}

export interface RequiredResponseElement {
  identity: string;
  claim: string;
  acceptedFormulations: readonly string[];
  contradictingFormulations: readonly string[];
  informativeFeedback: string;
}

export interface ResponseEvaluationContract {
  identity: string;
  proposedLearningDesignIdentity: string;
  learningObjectiveIdentity: string;
  supportingSource: SupportingSourceReference;
  correctionRequirementReference: string;
  mechanism: "bounded-retrieval";
  requiredResponseElements: readonly RequiredResponseElement[];
}

interface LearningDesignBase {
  identity: string;
  learningObjectiveIdentity: string;
  learningObjective: LearningObjective;
  relevantContext: RelevantContext;
  applicablePrinciples: CertifiedLearningPrincipleReference[];
  learningScienceRationale: string;
  learningRequirements: LearningRequirement[];
  proposedLearningMechanism: ProposedLearningMechanism;
  learnerPerformanceRequirement: LearnerPerformanceRequirement;
  feedbackResultRequirement: FeedbackResultRequirement;
  creatorControlledDecisions: CreatorControlledDecision[];
}

export interface ProposedLearningDesign extends LearningDesignBase {
  state: "PROPOSED";
}

export interface ApprovedLearningDesign extends LearningDesignBase {
  state: "APPROVED";
  responseEvaluationContractIdentity: string;
  responseEvaluationContractSnapshot: string;
  responseEvaluationContract: Readonly<ResponseEvaluationContract>;
}

export interface RejectedLearningDesign extends LearningDesignBase {
  state: "REJECTED";
}

export interface InvalidatedLearningDesign extends LearningDesignBase {
  state: "INVALIDATED";
}

export type LearningDesign =
  | ProposedLearningDesign
  | ApprovedLearningDesign
  | RejectedLearningDesign
  | InvalidatedLearningDesign;

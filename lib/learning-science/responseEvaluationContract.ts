import type {
  ProposedLearningDesign,
  RequiredResponseElement,
  ResponseEvaluationContract,
  SupportingSourceReference,
} from "./types";

export interface ResponseEvaluationContractInput {
  identity: string;
  learningObjectiveIdentity: string;
  supportingSource: SupportingSourceReference;
  correctionRequirementReference: string;
  requiredResponseElements: readonly RequiredResponseElement[];
}

export interface ReviewedResponseEvaluationContract {
  contract: ResponseEvaluationContract;
  reviewedSnapshot: string;
  sourceGroundedAndSuitableConfirmed: true;
}

function normalized(value: string) {
  return value.normalize("NFKC").toLowerCase().replace(/\s+/gu, " ").trim().replace(/[.!?]+$/u, "");
}

function snapshot(contract: ResponseEvaluationContract) {
  return JSON.stringify(contract);
}

export function createAuthorityIdentity(kind: "objective" | "source" | "context", value: unknown) {
  const text = JSON.stringify(value).normalize("NFKC");
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `${kind}-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function assertText(value: string, field: string) {
  if (!value.trim()) throw new Error(`Response Evaluation Contract requires ${field}.`);
}

export function validateResponseEvaluationContract(
  design: ProposedLearningDesign,
  contract: ResponseEvaluationContract,
) {
  assertText(contract.identity, "a stable identity");
  assertText(contract.learningObjectiveIdentity, "a Learning Objective identity");
  assertText(contract.supportingSource.identity, "a supporting source identity");
  assertText(contract.correctionRequirementReference, "an Informative Correction requirement reference");
  if (contract.proposedLearningDesignIdentity !== design.identity) throw new Error("Response Evaluation Contract must reference the same Proposed Learning Design.");
  if (contract.learningObjectiveIdentity !== design.learningObjectiveIdentity) throw new Error("Response Evaluation Contract Learning Objective does not match the Proposed Learning Design.");
  if (contract.mechanism !== design.proposedLearningMechanism.kind) throw new Error("Response Evaluation Contract mechanism does not match the Proposed Learning Design.");
  if (contract.correctionRequirementReference !== design.feedbackResultRequirement.description) throw new Error("Response Evaluation Contract correction requirement does not match the Proposed Learning Design.");
  if (!Number.isInteger(contract.supportingSource.boundary.startOffset) || !Number.isInteger(contract.supportingSource.boundary.endOffset) || contract.supportingSource.boundary.startOffset < 0 || contract.supportingSource.boundary.endOffset <= contract.supportingSource.boundary.startOffset) throw new Error("Response Evaluation Contract requires a valid immutable source boundary.");
  if (contract.requiredResponseElements.length === 0) throw new Error("Response Evaluation Contract requires at least one ordered response element.");

  const acceptedAcrossElements = new Set<string>();
  const elementIdentities = new Set<string>();
  for (const element of contract.requiredResponseElements) {
    assertText(element.identity, "a stable element identity");
    assertText(element.claim, "a source-grounded claim");
    assertText(element.informativeFeedback, "source-grounded informative feedback");
    if (elementIdentities.has(element.identity)) throw new Error("Response Evaluation Contract element identities must be unique.");
    elementIdentities.add(element.identity);
    if (element.acceptedFormulations.length === 0) throw new Error("Each response element requires at least one accepted formulation.");
    const accepted = new Set(element.acceptedFormulations.map((value) => { assertText(value, "non-empty accepted formulations"); return normalized(value); }));
    const contradicting = new Set(element.contradictingFormulations.map((value) => { assertText(value, "non-empty contradicting formulations"); return normalized(value); }));
    if (accepted.size !== element.acceptedFormulations.length || contradicting.size !== element.contradictingFormulations.length) throw new Error("Response Evaluation Contract formulations must be unique after normalization.");
    for (const value of accepted) {
      if (contradicting.has(value)) throw new Error("A formulation cannot be both accepted and contradicting for one element.");
      acceptedAcrossElements.add(value);
    }
    for (const value of contradicting) if (acceptedAcrossElements.has(value)) throw new Error("An accepted formulation cannot be reused as contradicting input.");
  }
  for (const element of contract.requiredResponseElements) {
    for (const value of element.contradictingFormulations.map(normalized)) if (acceptedAcrossElements.has(value)) throw new Error("An accepted formulation cannot be reused as contradicting input.");
  }
}

export function formResponseEvaluationContract(
  design: ProposedLearningDesign,
  input: ResponseEvaluationContractInput,
  supportingSourceContext: string,
): ResponseEvaluationContract {
  assertText(supportingSourceContext, "the bounded supporting source context");
  const contract: ResponseEvaluationContract = {
    ...structuredClone(input),
    proposedLearningDesignIdentity: design.identity,
    mechanism: design.proposedLearningMechanism.kind,
  };
  validateResponseEvaluationContract(design, contract);
  const expectedSourceIdentity = createAuthorityIdentity("source", {
    context: supportingSourceContext,
    boundary: input.supportingSource.boundary,
  });
  if (input.supportingSource.identity !== expectedSourceIdentity) throw new Error("Response Evaluation Contract supporting source does not match its immutable source context and boundary.");
  return contract;
}

export function reviewResponseEvaluationContract(
  design: ProposedLearningDesign,
  contract: ResponseEvaluationContract,
  sourceGroundedAndSuitableConfirmed: boolean,
): ReviewedResponseEvaluationContract {
  if (!sourceGroundedAndSuitableConfirmed) throw new Error("Creator review confirmation is required before approval.");
  validateResponseEvaluationContract(design, contract);
  return { contract, reviewedSnapshot: snapshot(contract), sourceGroundedAndSuitableConfirmed: true };
}

export function assertReviewedContractIsCurrent(
  design: ProposedLearningDesign,
  reviewed: ReviewedResponseEvaluationContract,
) {
  validateResponseEvaluationContract(design, reviewed.contract);
  if (snapshot(reviewed.contract) !== reviewed.reviewedSnapshot) throw new Error("Response Evaluation Contract changed after Creator review.");
}

export function immutableContractSnapshot(contract: ResponseEvaluationContract) {
  const copy = structuredClone(contract);
  Object.freeze(copy.supportingSource.boundary);
  Object.freeze(copy.supportingSource);
  for (const element of copy.requiredResponseElements) {
    Object.freeze(element.acceptedFormulations);
    Object.freeze(element.contradictingFormulations);
    Object.freeze(element);
  }
  Object.freeze(copy.requiredResponseElements);
  return Object.freeze(copy);
}

export function serializeContractSnapshot(contract: ResponseEvaluationContract) {
  return snapshot(contract);
}

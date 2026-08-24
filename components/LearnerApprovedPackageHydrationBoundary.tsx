"use client";

import ApprovedCreatorRetrievalExperience from "./ApprovedCreatorRetrievalExperience";
import { deriveLearningDesign } from "../lib/learning-science/deriveLearningDesign";
import { validateLaterRetrievalPrerequisite } from "../lib/learning-science/laterRetrievalPrerequisite";
import { requireApprovedLearningDesign } from "../lib/learning-science/learningDesignExecution";
import { createAuthorityIdentity, validateResponseEvaluationContract } from "../lib/learning-science/responseEvaluationContract";
import type { ApprovedLearningDesign, LaterRetrievalPrerequisiteDraft, ProposedLearningDesign } from "../lib/learning-science/types";

type JsonRecord = Record<string, unknown>;

const designKeys = ["identity", "learningObjectiveIdentity", "learningObjective", "relevantContext", "applicablePrinciples", "distributedPracticeApplicability", "learningScienceRationale", "learningRequirements", "proposedLearningMechanism", "learnerPerformanceRequirement", "feedbackResultRequirement", "creatorControlledDecisions", "state", "responseEvaluationContractIdentity", "responseEvaluationContractSnapshot", "responseEvaluationContract", "laterRetrievalPrerequisiteIdentity", "laterRetrievalPrerequisiteSnapshot", "laterRetrievalPrerequisite"] as const;

function invalid(): never {
  throw new Error("Learner hydration requires a valid approved authority package.");
}

function exactRecord(value: unknown, keys: readonly string[]): JsonRecord {
  if (!value || typeof value !== "object" || Array.isArray(value)) invalid();
  const candidate = value as JsonRecord;
  const actual = Object.keys(candidate);
  if (actual.length !== keys.length || keys.some((key) => !Object.hasOwn(candidate, key))) invalid();
  return candidate;
}

function text(value: unknown) {
  if (typeof value !== "string" || !value.trim()) invalid();
}

function textArray(value: unknown) {
  if (!Array.isArray(value)) invalid();
  value.forEach(text);
}

function describedArray(value: unknown) {
  if (!Array.isArray(value)) invalid();
  value.forEach((item) => {
    const record = exactRecord(item, ["description"]);
    text(record.description);
  });
}

function validateClosedDesign(value: unknown): asserts value is ApprovedLearningDesign {
  const design = exactRecord(value, designKeys);
  [design.identity, design.learningObjectiveIdentity, design.learningScienceRationale,
    design.responseEvaluationContractIdentity, design.responseEvaluationContractSnapshot,
    design.laterRetrievalPrerequisiteIdentity, design.laterRetrievalPrerequisiteSnapshot].forEach(text);
  if (design.state !== "APPROVED") invalid();

  text(exactRecord(design.learningObjective, ["statement"]).statement);
  const context = exactRecord(design.relevantContext, ["description", "durableRetentionOfPreviouslyAcquiredKnowledgeIntended"]);
  text(context.description);
  if (context.durableRetentionOfPreviouslyAcquiredKnowledgeIntended !== true) invalid();
  textArray(design.applicablePrinciples);
  const applicability = exactRecord(design.distributedPracticeApplicability, ["principleReference", "repeatedLearningOpportunitiesRequired"]);
  if (applicability.principleReference !== "DISTRIBUTED_PRACTICE" || applicability.repeatedLearningOpportunitiesRequired !== true) invalid();
  describedArray(design.learningRequirements);
  describedArray(design.creatorControlledDecisions);
  for (const key of ["proposedLearningMechanism", "learnerPerformanceRequirement", "feedbackResultRequirement"] as const) {
    const keys = key === "proposedLearningMechanism" ? ["kind", "description"] : ["description"];
    const record = exactRecord(design[key], keys);
    text(record.description);
    if (key === "proposedLearningMechanism" && record.kind !== "bounded-retrieval") invalid();
  }

  const contract = exactRecord(design.responseEvaluationContract, ["identity", "learningObjectiveIdentity", "supportingSource", "correctionRequirementReference", "requiredResponseElements", "proposedLearningDesignIdentity", "mechanism"]);
  [contract.identity, contract.learningObjectiveIdentity, contract.correctionRequirementReference, contract.proposedLearningDesignIdentity].forEach(text);
  if (contract.mechanism !== "bounded-retrieval" || !Array.isArray(contract.requiredResponseElements)) invalid();
  const source = exactRecord(contract.supportingSource, ["identity", "boundary"]);
  text(source.identity);
  const boundary = exactRecord(source.boundary, ["startOffset", "endOffset"]);
  if (!Number.isInteger(boundary.startOffset) || !Number.isInteger(boundary.endOffset)) invalid();
  contract.requiredResponseElements.forEach((item) => {
    const element = exactRecord(item, ["identity", "claim", "acceptedFormulations", "contradictingFormulations", "informativeFeedback"]);
    [element.identity, element.claim, element.informativeFeedback].forEach(text);
    textArray(element.acceptedFormulations);
    textArray(element.contradictingFormulations);
  });

  const prerequisite = exactRecord(design.laterRetrievalPrerequisite, ["identity", "proposedLearningDesignIdentity", "learningObjectiveIdentity", "relevantContextIdentity", "supportingSourceBoundaryIdentity", "earliestEligibilityDelay", "creatorAuthorityReference", "principleReference", "repeatedLearningOpportunitiesRequired", "creatorApprovalEvent"]);
  [prerequisite.identity, prerequisite.proposedLearningDesignIdentity, prerequisite.learningObjectiveIdentity, prerequisite.relevantContextIdentity, prerequisite.supportingSourceBoundaryIdentity, prerequisite.creatorAuthorityReference, prerequisite.creatorApprovalEvent].forEach(text);
  if (prerequisite.principleReference !== "DISTRIBUTED_PRACTICE" || prerequisite.repeatedLearningOpportunitiesRequired !== true) invalid();
  const delay = exactRecord(prerequisite.earliestEligibilityDelay, ["value", "unit"]);
  if (!Number.isInteger(delay.value) || (delay.unit !== "HOURS" && delay.unit !== "DAYS")) invalid();
}

function deepFreeze(value: unknown): void {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return;
  Object.values(value).forEach(deepFreeze);
  Object.freeze(value);
}

function validateAuthorityBindings(design: ApprovedLearningDesign, supportingSourceContext: string) {
  const proposedShape = { ...design, state: "PROPOSED" } as JsonRecord;
  for (const key of designKeys.slice(13)) delete proposedShape[key];
  const reconstructed = {
    ...deriveLearningDesign({
      learningObjective: design.learningObjective,
      relevantContext: design.relevantContext,
    }),
    identity: design.identity,
  } satisfies ProposedLearningDesign;
  if (JSON.stringify(reconstructed) !== JSON.stringify(proposedShape)) invalid();

  validateResponseEvaluationContract(reconstructed, design.responseEvaluationContract);
  const prerequisiteDraft = { ...design.laterRetrievalPrerequisite } as JsonRecord;
  delete prerequisiteDraft.creatorApprovalEvent;
  validateLaterRetrievalPrerequisite(reconstructed, prerequisiteDraft as LaterRetrievalPrerequisiteDraft);
  if (design.laterRetrievalPrerequisite.supportingSourceBoundaryIdentity !== design.responseEvaluationContract.supportingSource.identity ||
    design.responseEvaluationContract.supportingSource.identity !== createAuthorityIdentity("source", {
      context: supportingSourceContext,
      boundary: design.responseEvaluationContract.supportingSource.boundary,
    })) invalid();
}

export function hydrateApprovedAuthorityPackage(serializedPackage: string) {
  try {
    if (typeof serializedPackage !== "string" || !serializedPackage) invalid();
    const parsed: unknown = JSON.parse(serializedPackage);
    const pkg = exactRecord(parsed, ["learningDesign", "supportingSourceContext"]);
    text(pkg.supportingSourceContext);
    validateClosedDesign(pkg.learningDesign);
    validateAuthorityBindings(pkg.learningDesign, pkg.supportingSourceContext as string);
    deepFreeze(parsed);
    const learningDesign = requireApprovedLearningDesign(pkg.learningDesign);
    return Object.freeze({
      learningDesign,
      supportingSourceContext: pkg.supportingSourceContext as string,
    });
  } catch {
    return invalid();
  }
}

export default function LearnerApprovedPackageHydrationBoundary({
  serializedPackage,
}: Readonly<{ serializedPackage: string }>) {
  const authorityPackage = hydrateApprovedAuthorityPackage(serializedPackage);
  return <ApprovedCreatorRetrievalExperience {...authorityPackage} />;
}

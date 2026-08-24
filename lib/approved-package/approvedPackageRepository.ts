import type { SupabaseClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";

import { requireApprovedLearningDesign } from "../learning-science/learningDesignExecution";
import { approveLearningDesign } from "../learning-science/learningDesignLifecycle";
import { deriveLearningDesign } from "../learning-science/deriveLearningDesign";
import { createAuthorityIdentity, reviewResponseEvaluationContract } from "../learning-science/responseEvaluationContract";
import { reviewLaterRetrievalPrerequisite } from "../learning-science/laterRetrievalPrerequisite";
import type { ReviewedLaterRetrievalPrerequisite } from "../learning-science/laterRetrievalPrerequisite";
import type { ReviewedResponseEvaluationContract } from "../learning-science/responseEvaluationContract";
import type { ApprovedLearningDesign, LaterRetrievalPrerequisiteDraft, ProposedLearningDesign, ResponseEvaluationContract } from "../learning-science/types";
import type { Database } from "../../types/database";

export type ApprovedAuthorityPackage = Readonly<{
  learningDesign: ApprovedLearningDesign;
  supportingSourceContext: string;
}>;

export type PreApprovalAuthorityPackageInput = Readonly<{
  proposedLearningDesign: ProposedLearningDesign;
  reviewedResponseEvaluationContractDraft: ReviewedResponseEvaluationContract & Readonly<{
    supportingSourceContext: string;
  }>;
  reviewedLaterRetrievalPrerequisiteDraft: ReviewedLaterRetrievalPrerequisite;
}>;

type PersistedApprovedPackageRow = {
  owner_id: string;
  package_identity: string;
  serialized_package: string;
  package_digest: string;
};

export interface ApprovedPackageStore {
  findForOwner(ownerId: string): Promise<PersistedApprovedPackageRow | null>;
  insert(row: PersistedApprovedPackageRow): Promise<"inserted" | "conflict">;
}

function deepFreeze(value: unknown): unknown {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    for (const nested of Object.values(value)) deepFreeze(nested);
    Object.freeze(value);
  }
  return value;
}

function failClosed(): never {
  throw new Error("Persisted approved authority package is invalid.");
}

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) failClosed();
  return value as Record<string, unknown>;
}

function exactKeys(value: unknown, keys: readonly string[]) {
  const result = record(value);
  const actual = Object.keys(result);
  if (actual.length !== keys.length || keys.some((key) => !Object.hasOwn(result, key))) failClosed();
  return result;
}

function text(value: unknown) {
  if (typeof value !== "string" || !value.trim()) failClosed();
  return value;
}

function strings(value: unknown) {
  if (!Array.isArray(value)) failClosed();
  return value.map(text);
}

function number(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value)) failClosed();
  return value;
}

function closedProposedLearningDesign(value: unknown): ProposedLearningDesign {
  const design = exactKeys(value, ["identity", "learningObjectiveIdentity", "learningObjective", "relevantContext", "applicablePrinciples", "distributedPracticeApplicability", "learningScienceRationale", "learningRequirements", "proposedLearningMechanism", "learnerPerformanceRequirement", "feedbackResultRequirement", "creatorControlledDecisions", "state"]);
  if (design.state !== "PROPOSED") failClosed();
  const objective = exactKeys(design.learningObjective, ["statement"]);
  const context = exactKeys(design.relevantContext, ["description", "durableRetentionOfPreviouslyAcquiredKnowledgeIntended"]);
  if (context.durableRetentionOfPreviouslyAcquiredKnowledgeIntended !== true) failClosed();
  const derived = deriveLearningDesign({
    learningObjective: { statement: text(objective.statement) },
    relevantContext: {
      description: text(context.description),
      durableRetentionOfPreviouslyAcquiredKnowledgeIntended: true,
    },
  });
  const reconstructed = { ...derived, identity: text(design.identity) } satisfies ProposedLearningDesign;
  if (JSON.stringify(reconstructed) !== JSON.stringify(value)) failClosed();
  return reconstructed;
}

function closedContract(value: unknown): ResponseEvaluationContract {
  const contract = exactKeys(value, ["identity", "learningObjectiveIdentity", "supportingSource", "correctionRequirementReference", "requiredResponseElements", "proposedLearningDesignIdentity", "mechanism"]);
  const source = exactKeys(contract.supportingSource, ["identity", "boundary"]);
  const boundary = exactKeys(source.boundary, ["startOffset", "endOffset"]);
  if (!Array.isArray(contract.requiredResponseElements)) failClosed();
  const requiredResponseElements = contract.requiredResponseElements.map((candidate) => {
    const element = exactKeys(candidate, ["identity", "claim", "acceptedFormulations", "contradictingFormulations", "informativeFeedback"]);
    return { identity: text(element.identity), claim: text(element.claim), acceptedFormulations: strings(element.acceptedFormulations), contradictingFormulations: strings(element.contradictingFormulations), informativeFeedback: text(element.informativeFeedback) };
  });
  const startOffset = number(boundary.startOffset);
  const endOffset = number(boundary.endOffset);
  if (contract.mechanism !== "bounded-retrieval") failClosed();
  return { identity: text(contract.identity), learningObjectiveIdentity: text(contract.learningObjectiveIdentity), supportingSource: { identity: text(source.identity), boundary: { startOffset, endOffset } }, correctionRequirementReference: text(contract.correctionRequirementReference), requiredResponseElements, proposedLearningDesignIdentity: text(contract.proposedLearningDesignIdentity), mechanism: contract.mechanism };
}

function closedPrerequisiteDraft(value: unknown): LaterRetrievalPrerequisiteDraft {
  const prerequisite = exactKeys(value, ["identity", "proposedLearningDesignIdentity", "learningObjectiveIdentity", "relevantContextIdentity", "supportingSourceBoundaryIdentity", "earliestEligibilityDelay", "creatorAuthorityReference", "principleReference", "repeatedLearningOpportunitiesRequired"]);
  const delay = exactKeys(prerequisite.earliestEligibilityDelay, ["value", "unit"]);
  const delayValue = number(delay.value);
  if ((delay.unit !== "HOURS" && delay.unit !== "DAYS") || prerequisite.principleReference !== "DISTRIBUTED_PRACTICE" || prerequisite.repeatedLearningOpportunitiesRequired !== true) failClosed();
  return { identity: text(prerequisite.identity), proposedLearningDesignIdentity: text(prerequisite.proposedLearningDesignIdentity), learningObjectiveIdentity: text(prerequisite.learningObjectiveIdentity), relevantContextIdentity: text(prerequisite.relevantContextIdentity), supportingSourceBoundaryIdentity: text(prerequisite.supportingSourceBoundaryIdentity), earliestEligibilityDelay: { value: delayValue, unit: delay.unit }, creatorAuthorityReference: text(prerequisite.creatorAuthorityReference), principleReference: prerequisite.principleReference, repeatedLearningOpportunitiesRequired: prerequisite.repeatedLearningOpportunitiesRequired };
}

export function approvePreApprovalAuthorityPackage(value: unknown): ApprovedAuthorityPackage {
  try {
    const pkg = exactKeys(value, ["proposedLearningDesign", "reviewedResponseEvaluationContractDraft", "reviewedLaterRetrievalPrerequisiteDraft"]);
    const proposed = closedProposedLearningDesign(pkg.proposedLearningDesign);
    const reviewedContractDraft = exactKeys(pkg.reviewedResponseEvaluationContractDraft, ["contract", "reviewedSnapshot", "sourceGroundedAndSuitableConfirmed", "supportingSourceContext"]);
    const contract = closedContract(reviewedContractDraft.contract);
    const context = text(reviewedContractDraft.supportingSourceContext);
    if (reviewedContractDraft.sourceGroundedAndSuitableConfirmed !== true || reviewedContractDraft.reviewedSnapshot !== JSON.stringify(contract)) failClosed();
    const reviewedPrerequisiteDraft = exactKeys(pkg.reviewedLaterRetrievalPrerequisiteDraft, ["prerequisite", "reviewedSnapshot", "completePrerequisiteConfirmed"]);
    const prerequisite = closedPrerequisiteDraft(reviewedPrerequisiteDraft.prerequisite);
    if (reviewedPrerequisiteDraft.completePrerequisiteConfirmed !== true || reviewedPrerequisiteDraft.reviewedSnapshot !== JSON.stringify(prerequisite)) failClosed();
    if (contract.supportingSource.identity !== createAuthorityIdentity("source", { context, boundary: contract.supportingSource.boundary })) failClosed();
    const reviewedContract = reviewResponseEvaluationContract(proposed, contract, true);
    const reviewedPrerequisite = reviewLaterRetrievalPrerequisite(proposed, prerequisite, true);
    const approved = approveLearningDesign(
      proposed,
      reviewedContract,
      reviewedPrerequisite,
    );
    requireApprovedLearningDesign(approved);
    const reconstructed = deepFreeze({ learningDesign: approved, supportingSourceContext: context }) as ApprovedAuthorityPackage;
    serializeApprovedAuthorityPackage(reconstructed);
    return reconstructed;
  } catch {
    return failClosed();
  }
}

function packageDigest(serializedPackage: string) {
  return createHash("sha256").update(serializedPackage, "utf8").digest("hex");
}

export function serializeApprovedAuthorityPackage(
  authorityPackage: ApprovedAuthorityPackage,
) {
  const approvedDesign = requireApprovedLearningDesign(authorityPackage.learningDesign);
  const context = authorityPackage.supportingSourceContext;
  if (typeof context !== "string" || !context.trim()) failClosed();

  const source = approvedDesign.responseEvaluationContract.supportingSource;
  if (source.identity !== createAuthorityIdentity("source", {
    context,
    boundary: source.boundary,
  })) failClosed();

  return JSON.stringify({ learningDesign: approvedDesign, supportingSourceContext: context });
}

export function deserializeApprovedAuthorityPackage(
  serializedPackage: string,
): ApprovedAuthorityPackage {
  try {
    if (typeof serializedPackage !== "string" || !serializedPackage) failClosed();
    const parsed: unknown = JSON.parse(serializedPackage);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) failClosed();
    const record = parsed as Record<string, unknown>;
    if (Object.keys(record).length !== 2 ||
      !("learningDesign" in record) ||
      !("supportingSourceContext" in record) ||
      typeof record.supportingSourceContext !== "string") failClosed();

    const pkg = exactKeys(parsed, ["learningDesign", "supportingSourceContext"]);
    const context = text(pkg.supportingSourceContext);
    const design = exactKeys(pkg.learningDesign, ["identity", "learningObjectiveIdentity", "learningObjective", "relevantContext", "applicablePrinciples", "distributedPracticeApplicability", "learningScienceRationale", "learningRequirements", "proposedLearningMechanism", "learnerPerformanceRequirement", "feedbackResultRequirement", "creatorControlledDecisions", "state", "responseEvaluationContractIdentity", "responseEvaluationContractSnapshot", "responseEvaluationContract", "laterRetrievalPrerequisiteIdentity", "laterRetrievalPrerequisiteSnapshot", "laterRetrievalPrerequisite"]);
    if (design.state !== "APPROVED") failClosed();
    const proposedShape = { ...design, state: "PROPOSED" } as Record<string, unknown>;
    delete proposedShape.responseEvaluationContractIdentity;
    delete proposedShape.responseEvaluationContractSnapshot;
    delete proposedShape.responseEvaluationContract;
    delete proposedShape.laterRetrievalPrerequisiteIdentity;
    delete proposedShape.laterRetrievalPrerequisiteSnapshot;
    delete proposedShape.laterRetrievalPrerequisite;
    const proposed = closedProposedLearningDesign(proposedShape);
    const contract = closedContract(design.responseEvaluationContract);
    const approvedPrerequisite = exactKeys(design.laterRetrievalPrerequisite, ["identity", "proposedLearningDesignIdentity", "learningObjectiveIdentity", "relevantContextIdentity", "supportingSourceBoundaryIdentity", "earliestEligibilityDelay", "creatorAuthorityReference", "principleReference", "repeatedLearningOpportunitiesRequired", "creatorApprovalEvent"]);
    const prerequisite = closedPrerequisiteDraft(Object.fromEntries(Object.entries(approvedPrerequisite).filter(([key]) => key !== "creatorApprovalEvent")));
    const event = text(approvedPrerequisite.creatorApprovalEvent);
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(event)) failClosed();
    if (design.responseEvaluationContractIdentity !== contract.identity || design.responseEvaluationContractSnapshot !== JSON.stringify(contract) || design.laterRetrievalPrerequisiteIdentity !== prerequisite.identity || design.laterRetrievalPrerequisiteSnapshot !== JSON.stringify(approvedPrerequisite)) failClosed();
    if (contract.supportingSource.identity !== createAuthorityIdentity("source", { context, boundary: contract.supportingSource.boundary })) failClosed();
    reviewResponseEvaluationContract(proposed, contract, true);
    reviewLaterRetrievalPrerequisite(proposed, prerequisite, true);
    if (prerequisite.supportingSourceBoundaryIdentity !== contract.supportingSource.identity) failClosed();
    const authorityPackage = deepFreeze(parsed) as ApprovedAuthorityPackage;
    if (JSON.stringify(authorityPackage) !== serializedPackage) failClosed();
    requireApprovedLearningDesign(authorityPackage.learningDesign);
    return authorityPackage;
  } catch {
    return failClosed();
  }
}

export async function createOnceOrReturnIdentical(
  store: ApprovedPackageStore,
  ownerId: string,
  authorityPackage: ApprovedAuthorityPackage,
) {
  if (!ownerId.trim()) throw new Error("Approved package persistence requires an authenticated owner.");
  const serializedPackage = serializeApprovedAuthorityPackage(authorityPackage);
  const digest = packageDigest(serializedPackage);
  const packageIdentity = authorityPackage.learningDesign.identity;
  const existing = await store.findForOwner(ownerId);

  if (existing) return requireIdentical(existing, ownerId, packageIdentity, serializedPackage);

  const result = await store.insert({
    owner_id: ownerId,
    package_identity: packageIdentity,
    serialized_package: serializedPackage,
    package_digest: digest,
  });
  if (result === "inserted") return deserializeApprovedAuthorityPackage(serializedPackage);

  const racedExisting = await store.findForOwner(ownerId);
  if (!racedExisting) throw new Error("Approved package creation failed closed.");
  return requireIdentical(racedExisting, ownerId, packageIdentity, serializedPackage);
}

function requireIdentical(
  row: PersistedApprovedPackageRow,
  ownerId: string,
  packageIdentity: string,
  serializedPackage: string,
) {
  if (row.owner_id !== ownerId ||
    row.package_identity !== packageIdentity ||
    row.serialized_package !== serializedPackage ||
    row.package_digest !== packageDigest(row.serialized_package)) {
    throw new Error("An immutable approved package already exists for this owner.");
  }
  return deserializeApprovedAuthorityPackage(row.serialized_package);
}

export class SupabaseApprovedPackageStore implements ApprovedPackageStore {
  constructor(private readonly supabase: SupabaseClient<Database>) {}

  async findForOwner(ownerId: string) {
    const { data, error } = await this.supabase
      .from("approved_authority_packages")
      .select("owner_id, package_identity, serialized_package, package_digest")
      .eq("owner_id", ownerId)
      .maybeSingle();
    if (error) throw new Error("Approved package retrieval failed closed.");
    return data;
  }

  async insert(row: PersistedApprovedPackageRow) {
    const { error } = await this.supabase
      .from("approved_authority_packages")
      .insert(row);
    if (!error) return "inserted" as const;
    if (error.code === "23505") return "conflict" as const;
    throw new Error("Approved package creation failed closed.");
  }
}

export class SupabaseApprovedPackageReader {
  constructor(private readonly supabase: SupabaseClient<Database>) {}

  async findForOwner(ownerId: string) {
    const { data, error } = await this.supabase
      .from("approved_authority_packages")
      .select("owner_id, package_identity, serialized_package, package_digest")
      .eq("owner_id", ownerId)
      .maybeSingle();
    if (error) throw new Error("Approved package retrieval failed closed.");
    return data;
  }
}

export async function requireOwnedApprovedAuthorityPackage(
  store: Pick<ApprovedPackageStore, "findForOwner">,
  ownerId: string,
) {
  if (!ownerId.trim()) throw new Error("Approved package retrieval requires an authenticated owner.");
  const row = await store.findForOwner(ownerId);
  if (!row || row.owner_id !== ownerId) throw new Error("No approved authority package is available.");
  if (row.package_digest !== packageDigest(row.serialized_package)) failClosed();
  const authorityPackage = deserializeApprovedAuthorityPackage(row.serialized_package);
  if (row.package_identity !== authorityPackage.learningDesign.identity) failClosed();
  requireApprovedLearningDesign(authorityPackage.learningDesign);
  return authorityPackage;
}

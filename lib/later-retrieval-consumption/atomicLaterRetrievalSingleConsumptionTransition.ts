import type { SupabaseClient } from "@supabase/supabase-js";

import {
  requireOwnedApprovedAuthorityPackage,
  type ApprovedPackageStore,
} from "../approved-package/approvedPackageRepository";
import {
  requireCompletionAnchorForExactTimestampParsing,
  type CompletionAnchorStore,
} from "../completion-anchor/completionAnchorRepository";
import { requireApprovedLearningDesign } from "../learning-science/learningDesignExecution";
import { serializeLaterRetrievalPrerequisite } from "../learning-science/laterRetrievalPrerequisite";
import { determineLaterRetrievalThresholdFromValidatedAuthority } from "../later-retrieval-threshold/laterRetrievalThresholdDetermination";
import type { Database } from "../../types/database";

export type AtomicLaterRetrievalSingleConsumptionTransition =
  | Readonly<{ outcome: "CONSUMED_ONCE"; packageIdentity: string; consumptionIdentity: string }>
  | Readonly<{ outcome: "FAIL_CLOSED" }>;

export type AtomicLaterRetrievalConsumptionTuple = Readonly<{
  authenticatedOwnerIdentity: string;
  persistedApprovedPackageIdentity: string;
  approvedLearningDesignIdentity: string;
  approvedLearningDesignSnapshot: string;
  laterRetrievalPrerequisiteIdentity: string;
  laterRetrievalPrerequisiteSnapshot: string;
  completionAnchorIdentity: string;
  completionAnchorSnapshot: string;
}>;

export type AtomicLaterRetrievalConsumptionFact = Readonly<
  AtomicLaterRetrievalConsumptionTuple & Readonly<{
    consumptionIdentity: string;
    createdAt: string;
  }>
>;

export interface AtomicLaterRetrievalConsumptionPersistence {
  createOnce(tuple: AtomicLaterRetrievalConsumptionTuple): Promise<unknown>;
}

const FAIL_CLOSED = Object.freeze({ outcome: "FAIL_CLOSED" } as const);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    for (const nested of Object.values(value)) deepFreeze(nested);
    Object.freeze(value);
  }
  return value;
}

function exactFact(value: unknown, tuple: AtomicLaterRetrievalConsumptionTuple): AtomicLaterRetrievalConsumptionFact | null {
  if (!value || typeof value !== "object" || Array.isArray(value) || !Object.isFrozen(value)) return null;
  const keys = [
    "authenticatedOwnerIdentity", "persistedApprovedPackageIdentity",
    "approvedLearningDesignIdentity", "approvedLearningDesignSnapshot",
    "laterRetrievalPrerequisiteIdentity", "laterRetrievalPrerequisiteSnapshot",
    "completionAnchorIdentity", "completionAnchorSnapshot", "consumptionIdentity", "createdAt",
  ];
  const record = value as Record<string, unknown>;
  if (Object.keys(record).length !== keys.length || keys.some((key) => !Object.hasOwn(record, key))) return null;
  if (record.authenticatedOwnerIdentity !== tuple.authenticatedOwnerIdentity ||
      record.persistedApprovedPackageIdentity !== tuple.persistedApprovedPackageIdentity ||
      record.approvedLearningDesignIdentity !== tuple.approvedLearningDesignIdentity ||
      record.approvedLearningDesignSnapshot !== tuple.approvedLearningDesignSnapshot ||
      record.laterRetrievalPrerequisiteIdentity !== tuple.laterRetrievalPrerequisiteIdentity ||
      record.laterRetrievalPrerequisiteSnapshot !== tuple.laterRetrievalPrerequisiteSnapshot ||
      record.completionAnchorIdentity !== tuple.completionAnchorIdentity ||
      record.completionAnchorSnapshot !== tuple.completionAnchorSnapshot ||
      typeof record.consumptionIdentity !== "string" || !UUID.test(record.consumptionIdentity) ||
      typeof record.createdAt !== "string" || !record.createdAt) return null;
  return value as AtomicLaterRetrievalConsumptionFact;
}

export async function atomicallyConsumeLaterRetrievalOnce(
  approvedPackageStore: Pick<ApprovedPackageStore, "findForOwner">,
  completionAnchorStore: Pick<CompletionAnchorStore, "find">,
  persistence: AtomicLaterRetrievalConsumptionPersistence,
  authenticatedOwnerIdentity: string,
  trustedServerEpochMicrosecondsClock: () => bigint,
): Promise<AtomicLaterRetrievalSingleConsumptionTransition> {
  try {
    if (typeof authenticatedOwnerIdentity !== "string" || !authenticatedOwnerIdentity.trim()) return FAIL_CLOSED;
    const authorityPackage = await requireOwnedApprovedAuthorityPackage(approvedPackageStore, authenticatedOwnerIdentity);
    const design = requireApprovedLearningDesign(authorityPackage.learningDesign);
    const packageIdentity = design.identity;
    if (!packageIdentity.trim()) return FAIL_CLOSED;
    const approvedLearningDesignSnapshot = JSON.stringify(design);
    const prerequisite = design.laterRetrievalPrerequisite;
    const laterRetrievalPrerequisiteSnapshot = serializeLaterRetrievalPrerequisite(prerequisite);
    if (design.laterRetrievalPrerequisiteIdentity !== prerequisite.identity ||
        design.laterRetrievalPrerequisiteSnapshot !== laterRetrievalPrerequisiteSnapshot) return FAIL_CLOSED;

    const anchor = await requireCompletionAnchorForExactTimestampParsing(
      completionAnchorStore,
      authenticatedOwnerIdentity,
      authorityPackage,
    );
    if (anchor.ownerId !== authenticatedOwnerIdentity || anchor.packageIdentity !== packageIdentity ||
        anchor.approvedLearningDesignIdentity !== design.identity ||
        anchor.approvedLearningDesignSnapshot !== approvedLearningDesignSnapshot ||
        anchor.completionAnchorSnapshot.ownerId !== authenticatedOwnerIdentity ||
        anchor.completionAnchorSnapshot.packageIdentity !== packageIdentity ||
        anchor.completionAnchorSnapshot.approvedLearningDesignIdentity !== design.identity ||
        anchor.completionAnchorSnapshot.approvedLearningDesignSnapshot !== approvedLearningDesignSnapshot ||
        !Object.isFrozen(anchor.completionAnchorSnapshot)) return FAIL_CLOSED;

    const threshold = determineLaterRetrievalThresholdFromValidatedAuthority(
      authenticatedOwnerIdentity,
      authorityPackage,
      anchor,
      trustedServerEpochMicrosecondsClock,
    );
    if (threshold.outcome !== "THRESHOLD_REACHED" || threshold.packageIdentity !== packageIdentity) return FAIL_CLOSED;

    const tuple = deepFreeze({
      authenticatedOwnerIdentity,
      persistedApprovedPackageIdentity: packageIdentity,
      approvedLearningDesignIdentity: design.identity,
      approvedLearningDesignSnapshot,
      laterRetrievalPrerequisiteIdentity: prerequisite.identity,
      laterRetrievalPrerequisiteSnapshot,
      completionAnchorIdentity: anchor.completionAnchorIdentity,
      completionAnchorSnapshot: JSON.stringify(anchor.completionAnchorSnapshot),
    }) satisfies AtomicLaterRetrievalConsumptionTuple;
    const fact = exactFact(await persistence.createOnce(tuple), tuple);
    if (!fact) return FAIL_CLOSED;
    return Object.freeze({ outcome: "CONSUMED_ONCE", packageIdentity, consumptionIdentity: fact.consumptionIdentity });
  } catch {
    return FAIL_CLOSED;
  }
}

type Row = Database["public"]["Tables"]["later_retrieval_single_consumptions"]["Row"];

export class SupabaseAtomicLaterRetrievalConsumptionPersistence implements AtomicLaterRetrievalConsumptionPersistence {
  constructor(private readonly supabase: SupabaseClient<Database>) {}

  async createOnce(tuple: AtomicLaterRetrievalConsumptionTuple): Promise<unknown> {
    const { data, error } = await this.supabase.rpc("create_later_retrieval_single_consumption_once", {
      p_authenticated_owner_identity: tuple.authenticatedOwnerIdentity,
      p_persisted_approved_package_identity: tuple.persistedApprovedPackageIdentity,
      p_approved_learning_design_identity: tuple.approvedLearningDesignIdentity,
      p_approved_learning_design_snapshot: tuple.approvedLearningDesignSnapshot,
      p_later_retrieval_prerequisite_identity: tuple.laterRetrievalPrerequisiteIdentity,
      p_later_retrieval_prerequisite_snapshot: tuple.laterRetrievalPrerequisiteSnapshot,
      p_completion_anchor_identity: tuple.completionAnchorIdentity,
      p_completion_anchor_snapshot: tuple.completionAnchorSnapshot,
    });
    if (error || !data || data.length !== 1) return null;
    const row = data[0] as Row;
    return deepFreeze({
      authenticatedOwnerIdentity: row.authenticated_owner_identity,
      persistedApprovedPackageIdentity: row.persisted_approved_package_identity,
      approvedLearningDesignIdentity: row.approved_learning_design_identity,
      approvedLearningDesignSnapshot: row.approved_learning_design_snapshot,
      laterRetrievalPrerequisiteIdentity: row.later_retrieval_prerequisite_identity,
      laterRetrievalPrerequisiteSnapshot: row.later_retrieval_prerequisite_snapshot,
      completionAnchorIdentity: row.completion_anchor_identity,
      completionAnchorSnapshot: row.completion_anchor_snapshot,
      consumptionIdentity: row.consumption_identity,
      createdAt: row.created_at,
    });
  }
}

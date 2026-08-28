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

export type LaterRetrievalSingleConsumptionGuard =
  | Readonly<{ outcome: "UNCONSUMED_AT_GUARD"; packageIdentity: string }>
  | Readonly<{ outcome: "FAIL_CLOSED" }>;

export type LaterRetrievalOpportunityTuple = Readonly<{
  authenticatedOwnerIdentity: string;
  persistedApprovedPackageIdentity: string;
  approvedLearningDesignIdentity: string;
  approvedLearningDesignSnapshot: string;
  laterRetrievalPrerequisiteIdentity: string;
  laterRetrievalPrerequisiteSnapshot: string;
  completionAnchorIdentity: string;
  completionAnchorSnapshot: Readonly<{
    ownerId: string;
    packageIdentity: string;
    approvedLearningDesignIdentity: string;
    approvedLearningDesignSnapshot: string;
    responseEvaluationContractIdentity: string;
    responseEvaluationContractSnapshot: string;
    retrievalInteractionIdentity: string;
    terminalInteractionDigest: string;
    completedAt: string;
  }>;
}>;

export type LaterRetrievalConsumptionFact = Readonly<
  LaterRetrievalOpportunityTuple & { consumptionIdentity: string }
>;

export type LaterRetrievalConsumptionReadResult =
  | Readonly<{ status: "ABSENT" }>
  | Readonly<{ status: "PRESENT"; fact: LaterRetrievalConsumptionFact }>
  | Readonly<{ status: "UNREADABLE" }>
  | Readonly<{ status: "CONFLICTING" }>;

export interface LaterRetrievalConsumptionStore {
  readExact(
    tuple: LaterRetrievalOpportunityTuple,
  ): Promise<LaterRetrievalConsumptionReadResult>;
}

const FAIL_CLOSED = Object.freeze({ outcome: "FAIL_CLOSED" } as const);

function exactKeys(value: object, keys: readonly string[]) {
  const actual = Object.keys(value);
  return actual.length === keys.length && keys.every((key) => Object.hasOwn(value, key));
}

function frozenExactStatus(value: unknown, status: string) {
  return Boolean(
    value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.isFrozen(value) &&
      exactKeys(value, ["status"]) &&
      (value as { status?: unknown }).status === status,
  );
}

function sameTuple(fact: Record<string, unknown>, tuple: LaterRetrievalOpportunityTuple) {
  return fact.authenticatedOwnerIdentity === tuple.authenticatedOwnerIdentity &&
    fact.persistedApprovedPackageIdentity === tuple.persistedApprovedPackageIdentity &&
    fact.approvedLearningDesignIdentity === tuple.approvedLearningDesignIdentity &&
    fact.approvedLearningDesignSnapshot === tuple.approvedLearningDesignSnapshot &&
    fact.laterRetrievalPrerequisiteIdentity === tuple.laterRetrievalPrerequisiteIdentity &&
    fact.laterRetrievalPrerequisiteSnapshot === tuple.laterRetrievalPrerequisiteSnapshot &&
    fact.completionAnchorIdentity === tuple.completionAnchorIdentity &&
    fact.completionAnchorSnapshot === tuple.completionAnchorSnapshot;
}

function exactPresent(value: unknown, tuple: LaterRetrievalOpportunityTuple) {
  if (!value || typeof value !== "object" || Array.isArray(value) || !Object.isFrozen(value) ||
      !exactKeys(value, ["status", "fact"]) || (value as { status?: unknown }).status !== "PRESENT") return false;
  const fact = (value as { fact?: unknown }).fact;
  if (!fact || typeof fact !== "object" || Array.isArray(fact) || !Object.isFrozen(fact) ||
      !exactKeys(fact, [
        "authenticatedOwnerIdentity", "persistedApprovedPackageIdentity",
        "approvedLearningDesignIdentity", "approvedLearningDesignSnapshot",
        "laterRetrievalPrerequisiteIdentity", "laterRetrievalPrerequisiteSnapshot",
        "completionAnchorIdentity", "completionAnchorSnapshot", "consumptionIdentity",
      ])) return false;
  const record = fact as Record<string, unknown>;
  return typeof record.consumptionIdentity === "string" && Boolean(record.consumptionIdentity.trim()) &&
    sameTuple(record, tuple);
}

export async function guardLaterRetrievalSingleConsumption(
  approvedPackageStore: Pick<ApprovedPackageStore, "findForOwner">,
  completionAnchorStore: Pick<CompletionAnchorStore, "find">,
  consumptionStore: LaterRetrievalConsumptionStore,
  authenticatedOwnerIdentity: string,
): Promise<LaterRetrievalSingleConsumptionGuard> {
  try {
    if (typeof authenticatedOwnerIdentity !== "string" || !authenticatedOwnerIdentity.trim()) return FAIL_CLOSED;
    const authorityPackage = await requireOwnedApprovedAuthorityPackage(
      approvedPackageStore,
      authenticatedOwnerIdentity,
    );
    const design = requireApprovedLearningDesign(authorityPackage.learningDesign);
    const packageIdentity = design.identity;
    if (!packageIdentity.trim()) return FAIL_CLOSED;
    const approvedLearningDesignSnapshot = JSON.stringify(design);
    const prerequisite = design.laterRetrievalPrerequisite;
    const prerequisiteSnapshot = serializeLaterRetrievalPrerequisite(prerequisite);
    if (design.laterRetrievalPrerequisiteIdentity !== prerequisite.identity ||
        design.laterRetrievalPrerequisiteSnapshot !== prerequisiteSnapshot) return FAIL_CLOSED;

    const anchor = await requireCompletionAnchorForExactTimestampParsing(
      completionAnchorStore,
      authenticatedOwnerIdentity,
      authorityPackage,
    );
    if (anchor.ownerId !== authenticatedOwnerIdentity ||
        anchor.packageIdentity !== packageIdentity ||
        anchor.approvedLearningDesignIdentity !== design.identity ||
        anchor.approvedLearningDesignSnapshot !== approvedLearningDesignSnapshot ||
        anchor.completionAnchorSnapshot.ownerId !== authenticatedOwnerIdentity ||
        anchor.completionAnchorSnapshot.packageIdentity !== packageIdentity ||
        anchor.completionAnchorSnapshot.approvedLearningDesignIdentity !== design.identity ||
        anchor.completionAnchorSnapshot.approvedLearningDesignSnapshot !== approvedLearningDesignSnapshot ||
        !Object.isFrozen(anchor.completionAnchorSnapshot)) return FAIL_CLOSED;

    const tuple = Object.freeze({
      authenticatedOwnerIdentity,
      persistedApprovedPackageIdentity: packageIdentity,
      approvedLearningDesignIdentity: design.identity,
      approvedLearningDesignSnapshot,
      laterRetrievalPrerequisiteIdentity: prerequisite.identity,
      laterRetrievalPrerequisiteSnapshot: prerequisiteSnapshot,
      completionAnchorIdentity: anchor.completionAnchorIdentity,
      completionAnchorSnapshot: anchor.completionAnchorSnapshot,
    }) satisfies LaterRetrievalOpportunityTuple;

    const result: unknown = await consumptionStore.readExact(tuple);
    if (frozenExactStatus(result, "ABSENT")) {
      return Object.freeze({ outcome: "UNCONSUMED_AT_GUARD", packageIdentity });
    }
    if (exactPresent(result, tuple) || frozenExactStatus(result, "UNREADABLE") ||
        frozenExactStatus(result, "CONFLICTING")) return FAIL_CLOSED;
    return FAIL_CLOSED;
  } catch {
    return FAIL_CLOSED;
  }
}

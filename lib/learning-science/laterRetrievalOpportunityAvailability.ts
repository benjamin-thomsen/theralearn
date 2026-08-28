import type {
  AtomicLaterRetrievalConsumptionFact,
  AtomicLaterRetrievalSingleConsumptionTransition,
} from "../later-retrieval-consumption/atomicLaterRetrievalSingleConsumptionTransition";

export type LaterRetrievalOpportunityAuthorityEvidence = Readonly<
  Omit<AtomicLaterRetrievalConsumptionFact, "consumptionIdentity" | "createdAt">
>;

export type LaterRetrievalOpportunityAvailability =
  | Readonly<{
      outcome: "OPPORTUNITY_AVAILABLE_ONCE";
      packageIdentity: string;
      consumptionIdentity: string;
      opportunitySnapshot: AtomicLaterRetrievalConsumptionFact;
    }>
  | Readonly<{ outcome: "FAIL_CLOSED" }>;

const FAIL_CLOSED = Object.freeze({ outcome: "FAIL_CLOSED" } as const);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const INSTANT = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:Z|([+-])(\d{2}):(\d{2}))$/;

const authorityKeys = [
  "authenticatedOwnerIdentity",
  "persistedApprovedPackageIdentity",
  "approvedLearningDesignIdentity",
  "approvedLearningDesignSnapshot",
  "laterRetrievalPrerequisiteIdentity",
  "laterRetrievalPrerequisiteSnapshot",
  "completionAnchorIdentity",
  "completionAnchorSnapshot",
] as const;
const factKeys = [...authorityKeys, "consumptionIdentity", "createdAt"] as const;

function isExactFrozenRecord(value: unknown, keys: readonly string[]): value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value) || !Object.isFrozen(value)) return false;
  if (Object.getPrototypeOf(value) !== Object.prototype) return false;
  const ownKeys = Reflect.ownKeys(value);
  return ownKeys.length === keys.length && keys.every((key) => Object.hasOwn(value, key));
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isSerializedSnapshot(value: unknown): value is string {
  if (!isNonEmptyString(value)) return false;
  try {
    const parsed: unknown = JSON.parse(value);
    return parsed !== null && typeof parsed === "object" && !Array.isArray(parsed);
  } catch {
    return false;
  }
}

function isValidInstant(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const match = INSTANT.exec(value);
  if (!match || !Number.isFinite(Date.parse(value))) return false;
  const [, year, month, day, hour, minute, second, offsetSign, offsetHour, offsetMinute] = match;
  const daysInMonth = new Date(Date.UTC(Number(year), Number(month), 0)).getUTCDate();
  return Number(month) >= 1 && Number(month) <= 12 &&
    Number(day) >= 1 && Number(day) <= daysInMonth &&
    Number(hour) <= 23 && Number(minute) <= 59 && Number(second) <= 59 &&
    (!offsetSign || (Number(offsetHour) <= 23 && Number(offsetMinute) <= 59));
}

function hasValidAuthorityValues(record: Record<string, unknown>): boolean {
  return isNonEmptyString(record.authenticatedOwnerIdentity) &&
    isNonEmptyString(record.persistedApprovedPackageIdentity) &&
    isNonEmptyString(record.approvedLearningDesignIdentity) &&
    isSerializedSnapshot(record.approvedLearningDesignSnapshot) &&
    isNonEmptyString(record.laterRetrievalPrerequisiteIdentity) &&
    isSerializedSnapshot(record.laterRetrievalPrerequisiteSnapshot) &&
    isNonEmptyString(record.completionAnchorIdentity) &&
    isSerializedSnapshot(record.completionAnchorSnapshot);
}

export function determineLaterRetrievalOpportunityAvailability(
  transition: AtomicLaterRetrievalSingleConsumptionTransition,
  fact: AtomicLaterRetrievalConsumptionFact,
  authority: LaterRetrievalOpportunityAuthorityEvidence,
): LaterRetrievalOpportunityAvailability {
  try {
    if (!isExactFrozenRecord(transition, ["outcome", "packageIdentity", "consumptionIdentity"]) ||
        transition.outcome !== "CONSUMED_ONCE" ||
        !isNonEmptyString(transition.packageIdentity) ||
        typeof transition.consumptionIdentity !== "string" || !UUID.test(transition.consumptionIdentity) ||
        !isExactFrozenRecord(fact, factKeys) || !hasValidAuthorityValues(fact) ||
        typeof fact.consumptionIdentity !== "string" || !UUID.test(fact.consumptionIdentity) ||
        !isValidInstant(fact.createdAt) ||
        !isExactFrozenRecord(authority, authorityKeys) || !hasValidAuthorityValues(authority) ||
        transition.packageIdentity !== fact.persistedApprovedPackageIdentity ||
        transition.consumptionIdentity !== fact.consumptionIdentity ||
        authorityKeys.some((key) => fact[key] !== authority[key])) {
      return FAIL_CLOSED;
    }

    return Object.freeze({
      outcome: "OPPORTUNITY_AVAILABLE_ONCE",
      packageIdentity: transition.packageIdentity,
      consumptionIdentity: fact.consumptionIdentity,
      opportunitySnapshot: fact,
    });
  } catch {
    return FAIL_CLOSED;
  }
}

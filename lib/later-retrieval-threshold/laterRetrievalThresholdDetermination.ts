import {
  requireOwnedApprovedAuthorityPackage,
  type ApprovedPackageStore,
} from "../approved-package/approvedPackageRepository";
import {
  requireCompletionAnchorForExactTimestampParsing,
  type CompletionAnchorStore,
  type ExistingApprovedRetrievalCompletionAnchor,
} from "../completion-anchor/completionAnchorRepository";
import { requireApprovedLearningDesign } from "../learning-science/learningDesignExecution";
import { createAuthorityIdentity, serializeContractSnapshot } from "../learning-science/responseEvaluationContract";
import { serializeLaterRetrievalPrerequisite } from "../learning-science/laterRetrievalPrerequisite";
import type { ApprovedAuthorityPackage } from "../approved-package/approvedPackageRepository";

export type LaterRetrievalThresholdDetermination =
  | Readonly<{ outcome: "BEFORE_THRESHOLD"; packageIdentity: string }>
  | Readonly<{ outcome: "THRESHOLD_REACHED"; packageIdentity: string }>
  | Readonly<{ outcome: "FAIL_CLOSED" }>;

const MINIMUM_INSTANT = -BigInt("62135596800000000");
const MAXIMUM_INSTANT = BigInt("253402300799999999");
const HOUR_MICROSECONDS = BigInt("3600000000");
const DAY_MICROSECONDS = BigInt("86400000000");
const FAIL_CLOSED = Object.freeze({ outcome: "FAIL_CLOSED" } as const);

function inRange(value: bigint) {
  return value >= MINIMUM_INSTANT && value <= MAXIMUM_INSTANT;
}

function leapYear(year: number) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function daysBeforeUnixEpoch(year: number, month: number, day: number) {
  const adjustedYear = year - (month <= 2 ? 1 : 0);
  const era = Math.floor(adjustedYear / 400);
  const yearOfEra = adjustedYear - era * 400;
  const adjustedMonth = month + (month > 2 ? -3 : 9);
  const dayOfYear = Math.floor((153 * adjustedMonth + 2) / 5) + day - 1;
  const dayOfEra = yearOfEra * 365 + Math.floor(yearOfEra / 4) - Math.floor(yearOfEra / 100) + dayOfYear;
  return BigInt(era * 146_097 + dayOfEra - 719_468);
}

function parseAbsoluteTimestamp(value: unknown): bigint | null {
  if (typeof value !== "string") return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,6}))?(Z|([+-])(\d{2}):(\d{2}))$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  const second = Number(match[6]);
  const monthLengths = [31, leapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year < 1 || month < 1 || month > 12 || day < 1 || day > monthLengths[month - 1] || hour > 23 || minute > 59 || second > 59) return null;

  let offsetMicroseconds = BigInt("0");
  if (match[8] !== "Z") {
    const offsetHour = Number(match[10]);
    const offsetMinute = Number(match[11]);
    if (offsetHour > 14 || offsetMinute > 59 || (offsetHour === 14 && offsetMinute !== 0)) return null;
    const magnitude = BigInt(offsetHour * 60 + offsetMinute) * BigInt("60000000");
    offsetMicroseconds = match[9] === "+" ? magnitude : -magnitude;
  }

  const fraction = BigInt((match[7] ?? "").padEnd(6, "0") || "0");
  const localInstant = daysBeforeUnixEpoch(year, month, day) * DAY_MICROSECONDS
    + BigInt(hour * 3_600 + minute * 60 + second) * BigInt("1000000")
    + fraction;
  const instant = localInstant - offsetMicroseconds;
  return inRange(instant) ? instant : null;
}

function hasExactBindings(
  ownerIdentity: unknown,
  authorityPackage: ApprovedAuthorityPackage,
  anchor: ExistingApprovedRetrievalCompletionAnchor,
) {
  if (typeof ownerIdentity !== "string" || !ownerIdentity.trim()) return false;
  const design = authorityPackage.learningDesign;
  const prerequisite = design.laterRetrievalPrerequisite;
  const contract = design.responseEvaluationContract;
  const packageIdentity = design.identity;
  return typeof packageIdentity === "string" && Boolean(packageIdentity.trim())
    && anchor.ownerId === ownerIdentity
    && anchor.packageIdentity === packageIdentity
    && anchor.approvedLearningDesignIdentity === design.identity
    && anchor.approvedLearningDesignSnapshot === JSON.stringify(design)
    && anchor.responseEvaluationContractIdentity === design.responseEvaluationContractIdentity
    && anchor.responseEvaluationContractSnapshot === design.responseEvaluationContractSnapshot
    && design.responseEvaluationContractIdentity === contract.identity
    && design.responseEvaluationContractSnapshot === serializeContractSnapshot(contract)
    && contract.proposedLearningDesignIdentity === design.identity
    && contract.learningObjectiveIdentity === design.learningObjectiveIdentity
    && design.laterRetrievalPrerequisiteIdentity === prerequisite.identity
    && design.laterRetrievalPrerequisiteSnapshot === serializeLaterRetrievalPrerequisite(prerequisite)
    && prerequisite.proposedLearningDesignIdentity === design.identity
    && prerequisite.learningObjectiveIdentity === design.learningObjectiveIdentity
    && prerequisite.relevantContextIdentity === createAuthorityIdentity("context", design.relevantContext)
    && prerequisite.supportingSourceBoundaryIdentity === contract.supportingSource.identity
    && prerequisite.principleReference === "DISTRIBUTED_PRACTICE"
    && prerequisite.repeatedLearningOpportunitiesRequired === true
    && typeof prerequisite.creatorAuthorityReference === "string"
    && Boolean(prerequisite.creatorAuthorityReference.trim())
    && typeof prerequisite.creatorApprovalEvent === "string"
    && Boolean(prerequisite.creatorApprovalEvent.trim())
    && Number.isSafeInteger(prerequisite.earliestEligibilityDelay.value)
    && prerequisite.earliestEligibilityDelay.value > 0
    && (prerequisite.earliestEligibilityDelay.unit === "HOURS" || prerequisite.earliestEligibilityDelay.unit === "DAYS");
}

function determineTemporalOutcome(
  packageIdentity: string,
  completedAt: unknown,
  delayValue: number,
  delayUnit: "HOURS" | "DAYS",
  assessmentInstant: unknown,
): LaterRetrievalThresholdDetermination {
  if (typeof assessmentInstant !== "bigint" || !inRange(assessmentInstant)) return FAIL_CLOSED;
  const completionInstant = parseAbsoluteTimestamp(completedAt);
  if (completionInstant === null) return FAIL_CLOSED;
  const unit = delayUnit === "HOURS" ? HOUR_MICROSECONDS : DAY_MICROSECONDS;
  const scaledDelay = BigInt(delayValue) * unit;
  if (!inRange(scaledDelay)) return FAIL_CLOSED;
  const threshold = completionInstant + scaledDelay;
  if (!inRange(threshold)) return FAIL_CLOSED;
  return Object.freeze(assessmentInstant < threshold
    ? { outcome: "BEFORE_THRESHOLD", packageIdentity }
    : { outcome: "THRESHOLD_REACHED", packageIdentity });
}

export function determineLaterRetrievalThresholdFromValidatedAuthority(
  authenticatedOwnerIdentity: string,
  authorityPackage: ApprovedAuthorityPackage,
  anchor: ExistingApprovedRetrievalCompletionAnchor,
  trustedServerEpochMicrosecondsClock: () => bigint,
): LaterRetrievalThresholdDetermination {
  try {
    requireApprovedLearningDesign(authorityPackage.learningDesign);
    if (!hasExactBindings(authenticatedOwnerIdentity, authorityPackage, anchor)) return FAIL_CLOSED;
    const assessmentInstant = trustedServerEpochMicrosecondsClock();
    const delay = authorityPackage.learningDesign.laterRetrievalPrerequisite.earliestEligibilityDelay;
    return determineTemporalOutcome(authorityPackage.learningDesign.identity, anchor.completedAt, delay.value, delay.unit, assessmentInstant);
  } catch {
    return FAIL_CLOSED;
  }
}

export async function determineLaterRetrievalThreshold(
  approvedPackageStore: Pick<ApprovedPackageStore, "findForOwner">,
  completionAnchorStore: Pick<CompletionAnchorStore, "find">,
  authenticatedOwnerIdentity: string,
  trustedServerEpochMicrosecondsClock: () => bigint,
): Promise<LaterRetrievalThresholdDetermination> {
  try {
    const authorityPackage = await requireOwnedApprovedAuthorityPackage(approvedPackageStore, authenticatedOwnerIdentity);
    requireApprovedLearningDesign(authorityPackage.learningDesign);
    const anchor = await requireCompletionAnchorForExactTimestampParsing(completionAnchorStore, authenticatedOwnerIdentity, authorityPackage);
    return determineLaterRetrievalThresholdFromValidatedAuthority(
      authenticatedOwnerIdentity,
      authorityPackage,
      anchor,
      trustedServerEpochMicrosecondsClock,
    );
  } catch {
    return FAIL_CLOSED;
  }
}

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  approvePreApprovalAuthorityPackage,
  serializeApprovedAuthorityPackage,
  type ApprovedPackageStore,
  type PreApprovalAuthorityPackageInput,
} from "../approved-package/approvedPackageRepository";
import type { CompletionAnchorRow, CompletionAnchorStore } from "../completion-anchor/completionAnchorRepository";
import { deriveLearningDesign } from "../learning-science/deriveLearningDesign";
import { formLaterRetrievalPrerequisite, relevantContextIdentity, reviewLaterRetrievalPrerequisite } from "../learning-science/laterRetrievalPrerequisite";
import { createAuthorityIdentity, formResponseEvaluationContract, reviewResponseEvaluationContract } from "../learning-science/responseEvaluationContract";
import { determineLaterRetrievalThreshold } from "./laterRetrievalThresholdDetermination";

const source = "Mentalization concerns mental states in oneself and others.";

function authority(delayValue = 1, delayUnit: "HOURS" | "DAYS" = "HOURS") {
  const design = deriveLearningDesign({ learningObjective: { statement: "Explain mentalization." }, relevantContext: { description: "Durable retention.", durableRetentionOfPreviouslyAcquiredKnowledgeIntended: true } });
  const boundary = { startOffset: 0, endOffset: source.length };
  const contract = formResponseEvaluationContract(design, { identity: "contract-1", learningObjectiveIdentity: design.learningObjectiveIdentity, supportingSource: { identity: createAuthorityIdentity("source", { context: source, boundary }), boundary }, correctionRequirementReference: design.feedbackResultRequirement.description, requiredResponseElements: [{ identity: "element-1", claim: "oneself and others", acceptedFormulations: ["oneself and others"], contradictingFormulations: ["only behavior"], informativeFeedback: "Include both." }] }, source);
  const prerequisite = formLaterRetrievalPrerequisite(design, { identity: "later-1", proposedLearningDesignIdentity: design.identity, learningObjectiveIdentity: design.learningObjectiveIdentity, relevantContextIdentity: relevantContextIdentity(design), supportingSourceBoundaryIdentity: contract.supportingSource.identity, earliestEligibilityDelay: { value: delayValue, unit: delayUnit }, creatorAuthorityReference: "creator-1" });
  return approvePreApprovalAuthorityPackage({ proposedLearningDesign: design, reviewedResponseEvaluationContractDraft: { ...reviewResponseEvaluationContract(design, contract, true), supportingSourceContext: source }, reviewedLaterRetrievalPrerequisiteDraft: reviewLaterRetrievalPrerequisite(design, prerequisite, true) } satisfies PreApprovalAuthorityPackageInput);
}

class MemoryApprovedStore implements ApprovedPackageStore {
  reads = 0;
  constructor(public owner = "owner-a", public pkg = authority()) {}
  async findForOwner(ownerId: string) {
    this.reads += 1;
    if (ownerId !== this.owner) return null;
    const serialized = serializeApprovedAuthorityPackage(this.pkg);
    return { owner_id: this.owner, package_identity: this.pkg.learningDesign.identity, serialized_package: serialized, package_digest: createHash("sha256").update(serialized, "utf8").digest("hex") };
  }
  async insert() { return "conflict" as const; }
}

class MemoryAnchorStore implements CompletionAnchorStore {
  reads = 0;
  constructor(public pkg = authority(), public completedAt = "1970-01-01T00:00:00Z") {}
  row(): CompletionAnchorRow {
    const design = this.pkg.learningDesign;
    return { owner_id: "owner-a", package_identity: design.identity, approved_learning_design_identity: design.identity, approved_learning_design_snapshot: JSON.stringify(design), response_evaluation_contract_identity: design.responseEvaluationContractIdentity, response_evaluation_contract_snapshot: design.responseEvaluationContractSnapshot, retrieval_interaction_identity: `first-approved-retrieval:${design.identity}`, terminal_interaction_digest: "a".repeat(64), completed_at: this.completedAt };
  }
  async find(ownerId: string, packageIdentity: string) { this.reads += 1; const row = this.row(); return row.owner_id === ownerId && row.package_identity === packageIdentity ? structuredClone(row) : null; }
  async createOnce(): Promise<CompletionAnchorRow> { throw new Error("persistence is outside the threshold boundary"); }
}

function setup(completedAt = "1970-01-01T00:00:00Z", delayValue = 1, delayUnit: "HOURS" | "DAYS" = "HOURS") {
  const pkg = authority(delayValue, delayUnit);
  return { approved: new MemoryApprovedStore("owner-a", pkg), anchor: new MemoryAnchorStore(pkg, completedAt) };
}

async function assess(completedAt: string, now: unknown, delayValue = 1, delayUnit: "HOURS" | "DAYS" = "HOURS") {
  const stores = setup(completedAt, delayValue, delayUnit);
  return determineLaterRetrievalThreshold(stores.approved, stores.anchor, "owner-a", (() => now) as () => bigint);
}

describe("later-retrieval threshold determination", () => {
  it.each([
    ["HOURS", BigInt("3599999999"), "BEFORE_THRESHOLD"], ["HOURS", BigInt("3600000000"), "THRESHOLD_REACHED"], ["HOURS", BigInt("3600000001"), "THRESHOLD_REACHED"],
    ["DAYS", BigInt("86399999999"), "BEFORE_THRESHOLD"], ["DAYS", BigInt("86400000000"), "THRESHOLD_REACHED"], ["DAYS", BigInt("86400000001"), "THRESHOLD_REACHED"],
  ] as const)("compares strictly before, at, and after for %s", async (unit, now, outcome) => {
    await expect(assess("1970-01-01T00:00:00Z", now, 1, unit)).resolves.toEqual({ outcome, packageIdentity: expect.any(String) });
  });

  it("reads a zero-argument clock exactly once after both authoritative reads and freezes the exact result", async () => {
    const { approved, anchor } = setup(); const calls: number[] = [];
    const result = await determineLaterRetrievalThreshold(approved, anchor, "owner-a", (...args: never[]) => { calls.push(args.length); expect(approved.reads).toBe(1); expect(anchor.reads).toBe(1); return BigInt("3600000000"); });
    expect(calls).toEqual([0]); expect(result).toEqual({ outcome: "THRESHOLD_REACHED", packageIdentity: approved.pkg.learningDesign.identity }); expect(Object.isFrozen(result)).toBe(true);
  });

  it.each(["", " ", "owner-b"])("fails authentication/ownership without reading the clock: %j", async (owner) => {
    let clocks = 0; const { approved, anchor } = setup();
    await expect(determineLaterRetrievalThreshold(approved, anchor, owner, () => { clocks += 1; return BigInt("0"); })).resolves.toEqual({ outcome: "FAIL_CLOSED" });
    expect(clocks).toBe(0);
  });

  it.each([
    "1970-01-01T00:00:00Z", "1970-01-01T01:00:00+01:00", "1969-12-31T23:00:00-01:00",
    "1970-01-01T00:00:00.1Z", "1970-01-01T00:00:00.12Z", "1970-01-01T00:00:00.123Z", "1970-01-01T00:00:00.1234Z", "1970-01-01T00:00:00.12345Z", "1970-01-01T00:00:00.123456Z",
    "2000-02-29T13:59:59+13:59", "2000-02-29T14:00:00+14:00",
  ])("accepts the sole exact timestamp grammar and valid calendar/offset: %s", async (timestamp) => {
    const result = await assess(timestamp, BigInt("253402300799999999")); expect(result.outcome).toBe("THRESHOLD_REACHED");
  });

  it.each([
    "", "1970-01-01 00:00:00Z", "1970-01-01T00:00:00", "1970-01-01T00:00:00z", "1970-01-01T00:00Z", " 1970-01-01T00:00:00Z",
    "0000-01-01T00:00:00Z", "1900-02-29T00:00:00Z", "2001-04-31T00:00:00Z", "2000-13-01T00:00:00Z", "2000-00-01T00:00:00Z",
    "2000-01-01T24:00:00Z", "2000-01-01T00:60:00Z", "2000-01-01T00:00:60Z", "2000-01-01T00:00:00.1234567Z",
    "2000-01-01T00:00:00+13:60", "2000-01-01T00:00:00+14:01", "2000-01-01T00:00:00+15:00",
    "0001-01-01T00:00:00+00:01", "9999-12-31T23:59:59.999999-00:01",
  ])("fails closed for malformed, invalid, unsupported, or normalized-out-of-range time: %s", async (timestamp) => {
    await expect(assess(timestamp, BigInt("0"))).resolves.toEqual({ outcome: "FAIL_CLOSED" });
  });

  it("preserves exact microseconds and right-pads fractions", async () => {
    await expect(assess("1970-01-01T00:00:00.1Z", BigInt("3600100000"))).resolves.toMatchObject({ outcome: "THRESHOLD_REACHED" });
    await expect(assess("1970-01-01T00:00:00.000001Z", BigInt("3600000000"))).resolves.toEqual({ outcome: "BEFORE_THRESHOLD", packageIdentity: expect.any(String) });
  });

  it.each([-BigInt("62135596800000001"), BigInt("253402300800000000"), 0, 0.5, "0", null])("rejects invalid clock values: %s", async (instant) => {
    await expect(assess("1970-01-01T00:00:00Z", instant)).resolves.toEqual({ outcome: "FAIL_CLOSED" });
  });

  it("accepts both clock endpoints and exact parsed endpoints when a threshold remains attainable", async () => {
    await expect(assess("0001-01-01T00:00:00Z", -BigInt("62135596800000000"))).resolves.toMatchObject({ outcome: "BEFORE_THRESHOLD" });
    await expect(assess("0001-01-01T00:00:00Z", -BigInt("62135593200000000"))).resolves.toMatchObject({ outcome: "THRESHOLD_REACHED" });
    await expect(assess("9999-12-31T22:59:59.999999Z", BigInt("253402300799999999"))).resolves.toMatchObject({ outcome: "THRESHOLD_REACHED" });
    await expect(assess("9999-12-30T23:59:59.999999Z", BigInt("253402300799999999"), 1, "DAYS")).resolves.toMatchObject({ outcome: "THRESHOLD_REACHED" });
  });

  it.each([
    ["HOURS", 1, "0001-01-01T00:00:00Z", -BigInt("62135593200000000"), "THRESHOLD_REACHED"],
    ["DAYS", 1, "0001-01-01T00:00:00Z", -BigInt("62135510400000000"), "THRESHOLD_REACHED"],
    ["HOURS", 70_389_527, "1970-01-01T00:00:00Z", BigInt("253402297200000000"), "THRESHOLD_REACHED"],
    ["DAYS", 2_932_896, "0001-01-01T00:00:00Z", BigInt("253402214400000000"), "THRESHOLD_REACHED"],
    ["HOURS", 70_389_528, "1970-01-01T00:00:00Z", BigInt("0"), "FAIL_CLOSED"],
    ["DAYS", 2_932_897, "1970-01-01T00:00:00Z", BigInt("0"), "FAIL_CLOSED"],
  ] as const)("checks required %s scaling boundary %s", async (unit, delay, completed, now, outcome) => {
    expect((await assess(completed, now, delay, unit)).outcome).toBe(outcome);
  });

  it.each([
    ["HOURS", "9999-12-31T23:00:00Z"], ["DAYS", "9999-12-31T00:00:00Z"],
  ] as const)("fails the nearest one-microsecond-above threshold for %s", async (unit, completed) => {
    await expect(assess(completed, BigInt("253402300799999999"), 1, unit)).resolves.toEqual({ outcome: "FAIL_CLOSED" });
  });

  it("fails every cross-input identity, snapshot, lifecycle, malformed, missing, and conflict condition before clock observation", async () => {
    const mutations: ((approved: MemoryApprovedStore, anchor: MemoryAnchorStore) => void)[] = [
      (a) => { a.owner = "other-owner"; },
      (_a, c) => { c.row = () => ({ ...MemoryAnchorStore.prototype.row.call(c), owner_id: "other-owner" }); },
      (_a, c) => { c.row = () => ({ ...MemoryAnchorStore.prototype.row.call(c), package_identity: "other-package" }); },
      (_a, c) => { c.row = () => ({ ...MemoryAnchorStore.prototype.row.call(c), approved_learning_design_identity: "other-design" }); },
      (_a, c) => { c.row = () => ({ ...MemoryAnchorStore.prototype.row.call(c), approved_learning_design_snapshot: "{}" }); },
      (_a, c) => { c.row = () => ({ ...MemoryAnchorStore.prototype.row.call(c), response_evaluation_contract_identity: "other-contract" }); },
      (_a, c) => { c.row = () => ({ ...MemoryAnchorStore.prototype.row.call(c), response_evaluation_contract_snapshot: "{}" }); },
      (_a, c) => { c.row = () => ({ ...MemoryAnchorStore.prototype.row.call(c), retrieval_interaction_identity: "other-interaction" }); },
      (_a, c) => { c.row = () => ({ ...MemoryAnchorStore.prototype.row.call(c), terminal_interaction_digest: "bad" }); },
      (_a, c) => { c.row = () => ({ ...MemoryAnchorStore.prototype.row.call(c), completed_at: "" }); },
    ];
    for (const mutate of mutations) { const { approved, anchor } = setup(); mutate(approved, anchor); let clocks = 0; expect(await determineLaterRetrievalThreshold(approved, anchor, "owner-a", () => { clocks += 1; return BigInt("0"); })).toEqual({ outcome: "FAIL_CLOSED" }); expect(clocks).toBe(0); }
  });

  it.each(["", " ", "different", 7])("rejects empty, whitespace, mismatched, and coerced package identity: %j", async (identity) => {
    const { approved, anchor } = setup();
    approved.findForOwner = async () => { const serialized = serializeApprovedAuthorityPackage(approved.pkg); return { owner_id: "owner-a", package_identity: identity as string, serialized_package: serialized, package_digest: createHash("sha256").update(serialized).digest("hex") }; };
    await expect(determineLaterRetrievalThreshold(approved, anchor, "owner-a", () => BigInt("0"))).resolves.toEqual({ outcome: "FAIL_CLOSED" });
  });

  it("performs fresh repeat assessments without mutating or persisting authority", async () => {
    const { approved, anchor } = setup(); const before = structuredClone(approved.pkg); let now = BigInt("0");
    expect((await determineLaterRetrievalThreshold(approved, anchor, "owner-a", () => now)).outcome).toBe("BEFORE_THRESHOLD");
    now = BigInt("3600000000");
    expect((await determineLaterRetrievalThreshold(approved, anchor, "owner-a", () => now)).outcome).toBe("THRESHOLD_REACHED");
    expect(approved.pkg).toEqual(before); expect(approved.reads).toBe(2); expect(anchor.reads).toBe(2);
  });

  it("returns only the three closed immutable shapes and no eligibility or next-step data", async () => {
    const failure = await assess("invalid", BigInt("0")); const before = await assess("1970-01-01T00:00:00Z", BigInt("0")); const reached = await assess("1970-01-01T00:00:00Z", BigInt("3600000000"));
    expect(failure).toEqual({ outcome: "FAIL_CLOSED" }); expect(Object.keys(failure)).toEqual(["outcome"]); expect(Object.isFrozen(failure)).toBe(true);
    for (const result of [before, reached]) { expect(Object.keys(result)).toEqual(["outcome", "packageIdentity"]); expect(result).not.toHaveProperty("eligible"); expect(result).not.toHaveProperty("threshold"); expect(Object.isFrozen(result)).toBe(true); }
  });

  it("composes only the exact-timestamp anchor seam and uses no prohibited mechanism", () => {
    const implementation = readFileSync(new URL("./laterRetrievalThresholdDetermination.ts", import.meta.url), "utf8");
    expect(implementation).toMatch(/import\s*{[\s\S]*?\brequireCompletionAnchorForExactTimestampParsing\b[\s\S]*?}\s*from\s*"\.\.\/completion-anchor\/completionAnchorRepository"/);
    expect(implementation).toMatch(/await requireCompletionAnchorForExactTimestampParsing\(completionAnchorStore, authenticatedOwnerIdentity, authorityPackage\)/);
    expect(implementation).not.toMatch(/\brequireCompletionAnchor\s*[,}(]/);
    expect(implementation).not.toMatch(/\bDate\b|parseFloat|Math\.(?:round|trunc)|setTimeout|setInterval|createOnce|insert\s*\(|schedule|navigate/i);
  });
});

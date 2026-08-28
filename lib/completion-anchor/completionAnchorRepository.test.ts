import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { approvePreApprovalAuthorityPackage, serializeApprovedAuthorityPackage, type PreApprovalAuthorityPackageInput } from "../approved-package/approvedPackageRepository";
import { deriveLearningDesign } from "../learning-science/deriveLearningDesign";
import { formLaterRetrievalPrerequisite, relevantContextIdentity, reviewLaterRetrievalPrerequisite } from "../learning-science/laterRetrievalPrerequisite";
import { createAuthorityIdentity, formResponseEvaluationContract, reviewResponseEvaluationContract } from "../learning-science/responseEvaluationContract";
import type { Database } from "../../types/database";
import { evaluateCorrectionAndComplete, evaluateInitialAndComplete, requireCompletionAnchor, requireCompletionAnchorForExactTimestampParsing, type CompletionAnchorRow, type CompletionAnchorStore } from "./completionAnchorRepository";

const source = "Mentalization concerns mental states in oneself and others.";
const secret = "test-only-completion-signing-secret-32-bytes";
function approvedPackage() {
  const design = deriveLearningDesign({ learningObjective: { statement: "Explain mentalization." }, relevantContext: { description: "Durable retention.", durableRetentionOfPreviouslyAcquiredKnowledgeIntended: true } });
  const boundary = { startOffset: 0, endOffset: source.length };
  const contract = formResponseEvaluationContract(design, { identity: "contract-1", learningObjectiveIdentity: design.learningObjectiveIdentity, supportingSource: { identity: createAuthorityIdentity("source", { context: source, boundary }), boundary }, correctionRequirementReference: design.feedbackResultRequirement.description, requiredResponseElements: [{ identity: "element-1", claim: "oneself and others", acceptedFormulations: ["oneself and others"], contradictingFormulations: ["only behavior"], informativeFeedback: "Include both." }] }, source);
  const prerequisite = formLaterRetrievalPrerequisite(design, { identity: "later-1", proposedLearningDesignIdentity: design.identity, learningObjectiveIdentity: design.learningObjectiveIdentity, relevantContextIdentity: relevantContextIdentity(design), supportingSourceBoundaryIdentity: contract.supportingSource.identity, earliestEligibilityDelay: { value: 2, unit: "DAYS" }, creatorAuthorityReference: "creator-1" });
  return approvePreApprovalAuthorityPackage({ proposedLearningDesign: design, reviewedResponseEvaluationContractDraft: { ...reviewResponseEvaluationContract(design, contract, true), supportingSourceContext: source }, reviewedLaterRetrievalPrerequisiteDraft: reviewLaterRetrievalPrerequisite(design, prerequisite, true) } satisfies PreApprovalAuthorityPackageInput);
}

class MemoryStore implements CompletionAnchorStore {
  row: CompletionAnchorRow | null = null;
  calls = 0;
  now = "2026-08-25T10:00:00.000Z";
  async find(owner: string, pkg: string) { return this.row?.owner_id === owner && this.row.package_identity === pkg ? structuredClone(this.row) : null; }
  async createOnce(input: Omit<CompletionAnchorRow, "completion_anchor_identity" | "completed_at">) {
    this.calls += 1;
    if (!this.row) this.row = { ...structuredClone(input), completion_anchor_identity: "00000000-0000-4000-8000-000000000001", completed_at: this.now };
    else if (Object.entries(input).some(([key, value]) => this.row?.[key as keyof CompletionAnchorRow] !== value)) throw new Error("Completion anchor creation failed closed.");
    return structuredClone(this.row);
  }
}

async function correction(s: MemoryStore, response = "only behavior") {
  const p = approvedPackage();
  const initial = await evaluateInitialAndComplete(s, secret, "owner-a", p, response);
  if (!("correctionReceipt" in initial) || !initial.correctionReceipt) throw new Error("expected correction receipt");
  return { p, initial, receipt: initial.correctionReceipt };
}

describe("completion anchor identity persistence and generated-type contracts", () => {
  it("preserves the exact completion-anchor identity migration contract", () => {
    const sql = readFileSync("supabase/migrations/20260825100000_add_completion_anchor_identity.sql", "utf8");
    expect(sql).toBe(`alter table public.approved_retrieval_completion_anchors
  add column completion_anchor_identity uuid not null default gen_random_uuid(),
  add constraint approved_retrieval_completion_anchors_identity_key unique (completion_anchor_identity);

create function public.reject_completion_anchor_identity_update()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.completion_anchor_identity is distinct from old.completion_anchor_identity then
    raise exception 'completion anchor identity is immutable' using errcode = '23514';
  end if;
  return new;
end;
$$;

create trigger completion_anchor_identity_immutable
before update of completion_anchor_identity on public.approved_retrieval_completion_anchors
for each row execute function public.reject_completion_anchor_identity_update();

revoke all on function public.reject_completion_anchor_identity_update() from public, anon, authenticated;

grant select (completion_anchor_identity)
on public.approved_retrieval_completion_anchors
to authenticated;
`);
    expect(sql.match(/add column completion_anchor_identity/gi)).toHaveLength(1);
    expect(sql).not.toMatch(/p_completion_anchor_identity|create_retrieval_completion_anchor_once|on conflict|primary key|foreign key|completed_at/i);
    expect(sql).not.toMatch(/grant (?:all|insert|update|delete|execute)|grant select \([^)]*terminal_interaction_digest|grant select on/i);
  });

  it("preserves the exact generated completion-anchor identity Row, Insert, and Update shapes", () => {
    type Table = Database["public"]["Tables"]["approved_retrieval_completion_anchors"];
    type Equal<Left, Right> = (<Value>() => Value extends Left ? 1 : 2) extends (<Value>() => Value extends Right ? 1 : 2)
      ? (<Value>() => Value extends Right ? 1 : 2) extends (<Value>() => Value extends Left ? 1 : 2) ? true : false
      : false;
    const rowIdentityIsRequiredString: Equal<Pick<Table["Row"], "completion_anchor_identity">, { completion_anchor_identity: string }> = true;
    const insertIdentityIsOptionalNever: Equal<Pick<Table["Insert"], "completion_anchor_identity">, { completion_anchor_identity?: never }> = true;
    const updateIdentityIsOptionalNever: Equal<Pick<Table["Update"], "completion_anchor_identity">, { completion_anchor_identity?: never }> = true;
    expect([rowIdentityIsRequiredString, insertIdentityIsOptionalNever, updateIdentityIsOptionalNever]).toEqual([true, true, true]);
  });
});

describe("completion anchor behavioral contract", () => {
  it("creates and returns the CORRECT-branch anchor in the same evaluation operation", async () => {
    const s = new MemoryStore(), p = approvedPackage();
    const outcome = await evaluateInitialAndComplete(s, secret, "owner-a", p, "oneself and others");
    expect(outcome.result.status).toBe("NO_CORRECTION_REQUIRED");
    expect("anchor" in outcome && outcome.anchor).toEqual(await requireCompletionAnchor(s, "owner-a", p));
    expect(s.calls).toBe(1);
  });

  it("returns one identical CORRECT-branch anchor for concurrent creation and later replay", async () => {
    const s = new MemoryStore(), p = approvedPackage();
    const concurrent = await Promise.all([
      evaluateInitialAndComplete(s, secret, "owner-a", p, "oneself and others"),
      evaluateInitialAndComplete(s, secret, "owner-a", p, "oneself and others"),
    ]);
    const replay = await evaluateInitialAndComplete(s, secret, "owner-a", p, "oneself and others");
    expect(concurrent[0]).toEqual(concurrent[1]);
    expect(replay).toEqual(concurrent[0]);
    expect(s.calls).toBe(3);
    expect(s.row?.completed_at).toBe(s.now);
  });

  it("fails closed for concurrent and replayed conflicting CORRECT-branch creation", async () => {
    const s = new MemoryStore(), p = approvedPackage();
    const outcomes = await Promise.allSettled([
      evaluateInitialAndComplete(s, secret, "owner-a", p, "oneself and others"),
      evaluateInitialAndComplete(s, secret, "owner-a", p, "oneself and others in mentalization"),
    ]);
    expect(outcomes.filter((outcome) => outcome.status === "fulfilled")).toHaveLength(1);
    expect(outcomes.filter((outcome) => outcome.status === "rejected")).toHaveLength(1);
    await expect(evaluateInitialAndComplete(s, secret, "owner-a", p, "mental states in oneself and others")).rejects.toThrow("failed closed");
    expect(s.row?.completed_at).toBe(s.now);
  });

  it("keeps correction continuity ephemeral and creates no row before a terminal correction", async () => {
    const s = new MemoryStore(); const { p, initial, receipt } = await correction(s);
    expect(initial.result.status).toBe("CORRECTION_REQUIRED");
    expect(receipt).toMatch(/^[A-Za-z0-9_-]+\.[0-9a-f]{64}$/);
    expect(s.row).toBeNull();
    await expect(requireCompletionAnchor(s, "owner-a", p)).rejects.toThrow("No completion anchor");
  });

  it.each([
    ["oneself and others", "CORRECTED"],
    ["still absent", "NOT_CORRECTED"],
    ["oneself and others only behavior", "INDETERMINATE"],
  ])("atomically creates an anchor for terminal correction %s -> %s", async (answer, status) => {
    const s = new MemoryStore(); const { p, receipt } = await correction(s);
    const outcome = await evaluateCorrectionAndComplete(s, secret, "owner-a", p, receipt, answer);
    expect(outcome.result.status).toBe(status);
    expect(outcome.anchor).toEqual(await requireCompletionAnchor(s, "owner-a", p));
    expect(s.calls).toBe(1);
  });

  it("atomically creates an anchor for a terminal correction evaluation failure", async () => {
    const s = new MemoryStore(); const { p, receipt } = await correction(s);
    const outcome = await evaluateCorrectionAndComplete(s, secret, "owner-a", p, receipt, "oneself and others", (first, correctionResponse) => ({ status: "EVALUATION_FAILURE", correctionResponse, firstResult: first, message: "Evaluation failed." }));
    expect(outcome.result.status).toBe("EVALUATION_FAILURE");
    expect(outcome.anchor).toEqual(await requireCompletionAnchor(s, "owner-a", p));
  });

  it("returns one identical terminal-correction anchor for concurrent creation and later replay", async () => {
    const s = new MemoryStore(); const { p, receipt } = await correction(s);
    const concurrent = await Promise.all([
      evaluateCorrectionAndComplete(s, secret, "owner-a", p, receipt, "oneself and others"),
      evaluateCorrectionAndComplete(s, secret, "owner-a", p, receipt, "oneself and others"),
    ]);
    const replay = await evaluateCorrectionAndComplete(s, secret, "owner-a", p, receipt, "oneself and others");
    expect(concurrent[0]).toEqual(concurrent[1]);
    expect(replay).toEqual(concurrent[0]);
    expect(s.calls).toBe(3);
    expect(s.row?.completed_at).toBe(s.now);
  });

  it("fails closed for concurrent and replayed conflicting terminal-correction creation", async () => {
    const s = new MemoryStore(); const { p, receipt } = await correction(s);
    const outcomes = await Promise.allSettled([evaluateCorrectionAndComplete(s, secret, "owner-a", p, receipt, "oneself and others"), evaluateCorrectionAndComplete(s, secret, "owner-a", p, receipt, "still absent")]);
    expect(outcomes.filter((x) => x.status === "fulfilled")).toHaveLength(1);
    expect(outcomes.filter((x) => x.status === "rejected")).toHaveLength(1);
    await expect(evaluateCorrectionAndComplete(s, secret, "owner-a", p, receipt, "oneself and others only behavior")).rejects.toThrow("failed closed");
    expect(s.row?.completed_at).toBe(s.now);
  });

  it("fails closed for missing server secret and receipt tampering", async () => {
    const s = new MemoryStore(), p = approvedPackage();
    await expect(evaluateInitialAndComplete(s, "", "owner-a", p, "oneself and others")).rejects.toThrow("signing is unavailable");
    const continuity = await correction(s);
    await expect(evaluateCorrectionAndComplete(s, secret, "owner-a", p, `${continuity.receipt.slice(0, -1)}0`, "oneself and others")).rejects.toThrow("invalid");
  });

  it("binds receipts and anchors to owner, package/design/contract identities and exact snapshots", async () => {
    const s = new MemoryStore(); const { p, receipt } = await correction(s);
    await expect(evaluateCorrectionAndComplete(s, secret, "owner-b", p, receipt, "oneself and others")).rejects.toThrow("invalid");
    const altered = { learningDesign: p.learningDesign, supportingSourceContext: `${p.supportingSourceContext} ` };
    await expect(evaluateCorrectionAndComplete(s, secret, "owner-a", altered, receipt, "oneself and others")).rejects.toThrow();
    expect(s.row).toBeNull();
  });

  it("persists only immutable authority fields, one terminal digest, and database-owned time", () => {
    const sql = readFileSync("supabase/migrations/20260825090000_create_approved_retrieval_completion_anchor.sql", "utf8");
    const table = sql.slice(sql.indexOf("create table"), sql.indexOf("alter table public.approved_retrieval_completion_anchors"));
    expect(sql).toMatch(/foreign key \(owner_id, package_identity\)/i);
    expect(sql).toMatch(/auth\.uid\(\).*owner_id/i);
    expect(sql).toMatch(/completed_at timestamptz not null default statement_timestamp\(\)/i);
    expect(table).toContain("terminal_interaction_digest");
    expect(table).not.toMatch(/first_result|correction_result|response_payload|attempt|pending|replay|anchor_payload|anchor_digest/i);
    expect(sql).not.toMatch(/eligib|schedul|consume|later_retrieval/i);
  });

  it("fails closed unless create-once execution uses service_role", () => {
    const sql = readFileSync("supabase/migrations/20260825090000_create_approved_retrieval_completion_anchor.sql", "utf8");
    const signature = "public.create_retrieval_completion_anchor_once(uuid,text,text,text,text,text,text,text)";
    expect(sql).toContain(`revoke all on function ${signature} from public, anon, authenticated;`);
    expect(sql).toContain(`grant execute on function ${signature} to service_role;`);
    const executeGrants = sql.match(/^grant execute on function .*$/gim) ?? [];
    expect(executeGrants).toEqual([`grant execute on function ${signature} to service_role;`]);
    expect(sql).not.toMatch(/grant execute on function public\.create_retrieval_completion_anchor_once\([^\n]+\) to (?:public|anon|authenticated)\s*;/i);
  });

  it("has no acknowledgement action or effect and returns anchors from both server mutations", () => {
    const actions = readFileSync("app/learner-handoff/actions.ts", "utf8");
    const component = readFileSync("components/ApprovedCreatorRetrievalExperience.tsx", "utf8");
    expect(`${actions}\n${component}`).not.toMatch(/acknowledg/i);
    expect(actions).toMatch(/evaluateInitialAndComplete/);
    expect(actions).toMatch(/evaluateCorrectionAndComplete/);
  });
});

describe("Date.parse-free exact-timestamp completion-anchor seam", () => {
  const exactTimestamp = "2026-08-25T10:00:00.123456+02:00";
  async function storedAnchor(completedAt: unknown) {
    const store = new MemoryStore(), pkg = approvedPackage();
    await evaluateInitialAndComplete(store, secret, "owner-a", pkg, "oneself and others");
    if (!store.row) throw new Error("expected completion anchor row");
    store.row.completed_at = completedAt as string;
    return { store, pkg };
  }

  it("keeps legacy timestamp validation behavior unchanged", async () => {
    for (const completedAt of [" ", "not-a-timestamp"]) {
      const { store, pkg } = await storedAnchor(completedAt);
      await expect(requireCompletionAnchor(store, "owner-a", pkg)).rejects.toThrow("invalid");
    }
  });

  it.each([
    "2026-08-25T10:00:00.123456+02:00",
    " ",
    "not-a-timestamp",
  ])("returns an immutable anchor with the exact non-empty completed_at string unchanged: %j", async (completedAt) => {
    const { store, pkg } = await storedAnchor(completedAt);
    const anchor = await requireCompletionAnchorForExactTimestampParsing(store, "owner-a", pkg);
    expect(anchor.completedAt).toBe(completedAt);
    expect(Object.isFrozen(anchor)).toBe(true);
    expect(anchor).toEqual({
      ownerId: "owner-a",
      packageIdentity: pkg.learningDesign.identity,
      approvedLearningDesignIdentity: pkg.learningDesign.identity,
      approvedLearningDesignSnapshot: JSON.stringify(pkg.learningDesign),
      responseEvaluationContractIdentity: pkg.learningDesign.responseEvaluationContractIdentity,
      responseEvaluationContractSnapshot: pkg.learningDesign.responseEvaluationContractSnapshot,
      retrievalInteractionIdentity: `first-approved-retrieval:${pkg.learningDesign.identity}`,
      completedAt,
      completionAnchorIdentity: "00000000-0000-4000-8000-000000000001",
      completionAnchorSnapshot: {
        ownerId: "owner-a",
        packageIdentity: pkg.learningDesign.identity,
        approvedLearningDesignIdentity: pkg.learningDesign.identity,
        approvedLearningDesignSnapshot: JSON.stringify(pkg.learningDesign),
        responseEvaluationContractIdentity: pkg.learningDesign.responseEvaluationContractIdentity,
        responseEvaluationContractSnapshot: pkg.learningDesign.responseEvaluationContractSnapshot,
        retrievalInteractionIdentity: `first-approved-retrieval:${pkg.learningDesign.identity}`,
        terminalInteractionDigest: store.row?.terminal_interaction_digest,
        completedAt,
      },
    });
    expect(Object.isFrozen(anchor.completionAnchorSnapshot)).toBe(true);
  });

  it.each([undefined, null, ""])("rejects absent or empty completed_at: %j", async (completedAt) => {
    const { store, pkg } = await storedAnchor(completedAt);
    await expect(requireCompletionAnchorForExactTimestampParsing(store, "owner-a", pkg)).rejects.toThrow("invalid");
  });

  it("fails closed for every completion-anchor authority-binding mismatch", async () => {
    const mutations: ((row: CompletionAnchorRow) => void)[] = [
      (row) => { row.owner_id = "owner-b"; },
      (row) => { row.package_identity = "other-package"; },
      (row) => { row.approved_learning_design_identity = "other-design"; },
      (row) => { row.approved_learning_design_snapshot = "{}"; },
      (row) => { row.response_evaluation_contract_identity = "other-contract"; },
      (row) => { row.response_evaluation_contract_snapshot = "{}"; },
      (row) => { row.retrieval_interaction_identity = "other-interaction"; },
      (row) => { row.terminal_interaction_digest = "bad"; },
      (row) => { row.completion_anchor_identity = ""; },
      (row) => { row.completion_anchor_identity = "not-a-uuid"; },
    ];
    for (const mutate of mutations) {
      const { store, pkg } = await storedAnchor(exactTimestamp);
      if (!store.row) throw new Error("expected completion anchor row");
      mutate(store.row);
      store.find = async () => structuredClone(store.row);
      await expect(requireCompletionAnchorForExactTimestampParsing(store, "owner-a", pkg)).rejects.toThrow("invalid");
    }
  });

  it("fails closed for unauthenticated access and a missing row through the sole find boundary", async () => {
    const pkg = approvedPackage(), store = new MemoryStore();
    await expect(requireCompletionAnchorForExactTimestampParsing(store, "", pkg)).rejects.toThrow("authenticated owner");
    expect(store.calls).toBe(0);
    await expect(requireCompletionAnchorForExactTimestampParsing(store, "owner-a", pkg)).rejects.toThrow("No completion anchor");
  });

  it("is a read-only seam with no temporal interpretation or numeric conversion in its complete local call path", () => {
    const implementation = readFileSync(new URL("./completionAnchorRepository.ts", import.meta.url), "utf8");
    const start = implementation.indexOf("export async function requireCompletionAnchorForExactTimestampParsing");
    const end = implementation.indexOf("\nexport class SupabaseCompletionAnchorStore", start);
    const seam = implementation.slice(start, end);
    const authorityStart = implementation.indexOf("function authority(");
    const authorityEnd = implementation.indexOf("\nfunction terminalDigest", authorityStart);
    const completeLocalPath = `${implementation.slice(authorityStart, authorityEnd)}\n${seam}`;
    expect(start).toBeGreaterThan(-1);
    expect(end).toBeGreaterThan(start);
    expect(completeLocalPath).not.toMatch(/\bDate\b|Date\.parse|parseInt|parseFloat|Number\s*\(|BigInt\s*\(|Math\.|trim\s*\(\s*row\.completed_at|clock|threshold|eligib|schedule|consume|createOnce|update|delete/i);
    expect(seam).toMatch(/store\.find\(ownerId, requireApprovedLearningDesign\(pkg\.learningDesign\)\.identity\)/);
    expect(seam).toMatch(/typeof row\.completed_at !== "string" \|\| row\.completed_at\.length === 0/);
  });

  it.each([
    ["1970-01-01T00:00:00Z", "THRESHOLD_REACHED"],
    ["1970-01-01T00:00:00z", "FAIL_CLOSED"],
    ["2000-02-30T00:00:00Z", "FAIL_CLOSED"],
    ["1970-01-01T00:00:00.1234567Z", "FAIL_CLOSED"],
    ["1970-01-01T00:00:00+14:01", "FAIL_CLOSED"],
    ["0001-01-01T00:00:00+00:01", "FAIL_CLOSED"],
    [" ", "FAIL_CLOSED"],
  ])("leaves grammar, calendar, precision, offset, and range decisions to the downstream exact parser: %j", async (completedAt, outcome) => {
    const pkg = approvedPackage();
    const anchorStore = new MemoryStore();
    await evaluateInitialAndComplete(anchorStore, secret, "owner-a", pkg, "oneself and others");
    if (!anchorStore.row) throw new Error("expected completion anchor row");
    anchorStore.row.completed_at = completedAt;
    const serialized = serializeApprovedAuthorityPackage(pkg);
    const approvedStore = {
      async findForOwner() { return { owner_id: "owner-a", package_identity: pkg.learningDesign.identity, serialized_package: serialized, package_digest: createHash("sha256").update(serialized, "utf8").digest("hex") }; },
    };
    const repository = await import("./completionAnchorRepository");
    const legacyRead = vi.spyOn(repository, "requireCompletionAnchor").mockImplementation(requireCompletionAnchorForExactTimestampParsing);
    const permissiveParser = vi.spyOn(Date, "parse");
    try {
      const { determineLaterRetrievalThreshold } = await import("../later-retrieval-threshold/laterRetrievalThresholdDetermination");
      const result = await determineLaterRetrievalThreshold(approvedStore, anchorStore, "owner-a", () => BigInt("253402300799999999"));
      expect(result.outcome).toBe(outcome);
      expect(permissiveParser).not.toHaveBeenCalled();
    } finally {
      permissiveParser.mockRestore();
      legacyRead.mockRestore();
    }
  });
});

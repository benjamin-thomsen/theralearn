import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { approvePreApprovalAuthorityPackage, type PreApprovalAuthorityPackageInput } from "../approved-package/approvedPackageRepository";
import { deriveLearningDesign } from "../learning-science/deriveLearningDesign";
import { formLaterRetrievalPrerequisite, relevantContextIdentity, reviewLaterRetrievalPrerequisite } from "../learning-science/laterRetrievalPrerequisite";
import { createAuthorityIdentity, formResponseEvaluationContract, reviewResponseEvaluationContract } from "../learning-science/responseEvaluationContract";
import { evaluateCorrectionAndComplete, evaluateInitialAndComplete, requireCompletionAnchor, type CompletionAnchorRow, type CompletionAnchorStore } from "./completionAnchorRepository";

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
  async createOnce(input: Omit<CompletionAnchorRow, "completed_at">) {
    this.calls += 1;
    if (!this.row) this.row = { ...structuredClone(input), completed_at: this.now };
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

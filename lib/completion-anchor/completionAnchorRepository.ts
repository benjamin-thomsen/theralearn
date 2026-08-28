import { createHmac, timingSafeEqual } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { ApprovedAuthorityPackage } from "../approved-package/approvedPackageRepository";
import { requireApprovedLearningDesign } from "../learning-science/learningDesignExecution";
import { evaluateCorrectionResponse, evaluateFirstResponse, type FirstResponseResult } from "../learning-science/responseEvaluation";
import type { Database } from "../../types/database";

export type ExistingApprovedRetrievalCompletionAnchor = Readonly<{ ownerId: string; packageIdentity: string; approvedLearningDesignIdentity: string; approvedLearningDesignSnapshot: string; responseEvaluationContractIdentity: string; responseEvaluationContractSnapshot: string; retrievalInteractionIdentity: string; completedAt: string }>;
export type CompletionAnchorRow = { owner_id: string; package_identity: string; approved_learning_design_identity: string; approved_learning_design_snapshot: string; response_evaluation_contract_identity: string; response_evaluation_contract_snapshot: string; retrieval_interaction_identity: string; terminal_interaction_digest: string; completion_anchor_identity: string; completed_at: string };
export interface CompletionAnchorStore { find(ownerId: string, packageIdentity: string): Promise<CompletionAnchorRow | null>; createOnce(row: Omit<CompletionAnchorRow, "completion_anchor_identity" | "completed_at">): Promise<CompletionAnchorRow>; }
type CompletionAnchorSnapshot = Readonly<{ ownerId: string; packageIdentity: string; approvedLearningDesignIdentity: string; approvedLearningDesignSnapshot: string; responseEvaluationContractIdentity: string; responseEvaluationContractSnapshot: string; retrievalInteractionIdentity: string; terminalInteractionDigest: string; completedAt: string }>;
type ReceiptPayload = Readonly<{ version: 1; ownerId: string; packageIdentity: string; approvedPackageSnapshotDigest: string; approvedLearningDesignIdentity: string; approvedLearningDesignSnapshot: string; responseEvaluationContractIdentity: string; responseEvaluationContractSnapshot: string; retrievalInteractionIdentity: string; targetIdentity: string; targetState: "CONTRADICTED" | "ABSENT"; initialInteractionDigest: string }>;
export type CorrectionContinuityReceipt = string & { readonly __correctionContinuityReceipt: unique symbol };

const invalid = (): never => { throw new Error("Completion anchor evidence is invalid."); };
const sign = (secret: string, value: string) => createHmac("sha256", secret).update(value, "utf8").digest("hex");
function requireSecret(secret: string) { if (typeof secret !== "string" || secret.length < 32) throw new Error("Completion receipt signing is unavailable."); return secret; }
function authority(ownerId: string, pkg: ApprovedAuthorityPackage) {
  if (!ownerId.trim()) throw new Error("Retrieval completion requires an authenticated owner.");
  const design = requireApprovedLearningDesign(pkg.learningDesign);
  return { ownerId, packageIdentity: design.identity, approvedLearningDesignIdentity: design.identity, approvedLearningDesignSnapshot: JSON.stringify(design), responseEvaluationContractIdentity: design.responseEvaluationContractIdentity, responseEvaluationContractSnapshot: design.responseEvaluationContractSnapshot, retrievalInteractionIdentity: `first-approved-retrieval:${design.identity}` } as const;
}
function terminalDigest(secret: string, facts: unknown) { return sign(requireSecret(secret), JSON.stringify({ purpose: "completion-anchor-terminal-v1", facts })); }
function anchorRow(secret: string, ownerId: string, pkg: ApprovedAuthorityPackage, facts: unknown): Omit<CompletionAnchorRow, "completion_anchor_identity" | "completed_at"> {
  const value = authority(ownerId, pkg);
  return { owner_id: value.ownerId, package_identity: value.packageIdentity, approved_learning_design_identity: value.approvedLearningDesignIdentity, approved_learning_design_snapshot: value.approvedLearningDesignSnapshot, response_evaluation_contract_identity: value.responseEvaluationContractIdentity, response_evaluation_contract_snapshot: value.responseEvaluationContractSnapshot, retrieval_interaction_identity: value.retrievalInteractionIdentity, terminal_interaction_digest: terminalDigest(secret, facts) };
}
function validateAnchor(row: CompletionAnchorRow, ownerId: string, pkg: ApprovedAuthorityPackage) {
  const expected = authority(ownerId, pkg);
  if (row.owner_id !== expected.ownerId || row.package_identity !== expected.packageIdentity || row.approved_learning_design_identity !== expected.approvedLearningDesignIdentity || row.approved_learning_design_snapshot !== expected.approvedLearningDesignSnapshot || row.response_evaluation_contract_identity !== expected.responseEvaluationContractIdentity || row.response_evaluation_contract_snapshot !== expected.responseEvaluationContractSnapshot || row.retrieval_interaction_identity !== expected.retrievalInteractionIdentity || !/^[0-9a-f]{64}$/.test(row.terminal_interaction_digest) || !row.completed_at || Number.isNaN(Date.parse(row.completed_at))) invalid();
  return Object.freeze({ ...expected, completedAt: row.completed_at }) as ExistingApprovedRetrievalCompletionAnchor;
}
function makeReceipt(secret: string, payload: ReceiptPayload): CorrectionContinuityReceipt { const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url"); return `${body}.${sign(requireSecret(secret), `correction-continuity-v1.${body}`)}` as CorrectionContinuityReceipt; }
function readReceipt(secret: string, receipt: string): ReceiptPayload {
  if (typeof receipt !== "string") invalid();
  const parts = receipt.split(".");
  if (parts.length !== 2 || !/^[A-Za-z0-9_-]+$/.test(parts[0]) || !/^[0-9a-f]{64}$/.test(parts[1])) invalid();
  const expected = sign(requireSecret(secret), `correction-continuity-v1.${parts[0]}`);
  if (!timingSafeEqual(Buffer.from(parts[1], "hex"), Buffer.from(expected, "hex"))) invalid();
  let value: unknown; try { value = JSON.parse(Buffer.from(parts[0], "base64url").toString("utf8")); } catch { return invalid(); }
  if (!value || typeof value !== "object" || Array.isArray(value)) invalid();
  const payload = value as Record<string, unknown>;
  const keys = ["version", "ownerId", "packageIdentity", "approvedPackageSnapshotDigest", "approvedLearningDesignIdentity", "approvedLearningDesignSnapshot", "responseEvaluationContractIdentity", "responseEvaluationContractSnapshot", "retrievalInteractionIdentity", "targetIdentity", "targetState", "initialInteractionDigest"];
  if (Object.keys(payload).length !== keys.length || keys.some((key) => !Object.hasOwn(payload, key)) || payload.version !== 1 || !keys.slice(1).every((key) => typeof payload[key] === "string" && Boolean((payload[key] as string).trim())) || (payload.targetState !== "CONTRADICTED" && payload.targetState !== "ABSENT") || !/^[0-9a-f]{64}$/.test(payload.initialInteractionDigest as string)) invalid();
  return payload as ReceiptPayload;
}

export async function evaluateInitialAndComplete(store: CompletionAnchorStore, secret: string, ownerId: string, pkg: ApprovedAuthorityPackage, learnerResponse: string) {
  const binding = authority(ownerId, pkg);
  const result = evaluateFirstResponse(pkg.learningDesign, learnerResponse, pkg.supportingSourceContext);
  if (result.status === "NO_CORRECTION_REQUIRED") { const row = await store.createOnce(anchorRow(secret, ownerId, pkg, { branch: "INITIAL", response: result.learnerResponse, status: result.status })); return { result, anchor: validateAnchor(row, ownerId, pkg) } as const; }
  if (result.status !== "CORRECTION_REQUIRED") return { result } as const;
  const initialInteractionDigest = terminalDigest(secret, { response: result.learnerResponse, status: result.status, targetIdentity: result.target.identity, targetState: result.targetState });
  return { result, correctionReceipt: makeReceipt(secret, { version: 1, ...binding, approvedPackageSnapshotDigest: terminalDigest(secret, { approvedPackage: pkg }), targetIdentity: result.target.identity, targetState: result.targetState, initialInteractionDigest }) } as const;
}
export async function evaluateCorrectionAndComplete(store: CompletionAnchorStore, secret: string, ownerId: string, pkg: ApprovedAuthorityPackage, receipt: string, correctionResponse: string, evaluateCorrection: typeof evaluateCorrectionResponse = evaluateCorrectionResponse) {
  const payload = readReceipt(secret, receipt); const binding = authority(ownerId, pkg);
  for (const key of ["ownerId", "packageIdentity", "approvedLearningDesignIdentity", "approvedLearningDesignSnapshot", "responseEvaluationContractIdentity", "responseEvaluationContractSnapshot", "retrievalInteractionIdentity"] as const) if (payload[key] !== binding[key]) invalid();
  if (payload.approvedPackageSnapshotDigest !== terminalDigest(secret, { approvedPackage: pkg })) invalid();
  const target = pkg.learningDesign.responseEvaluationContract.requiredResponseElements.find((item) => item.identity === payload.targetIdentity); if (!target) return invalid();
  const first = { status: "CORRECTION_REQUIRED", learnerResponse: "", approvedDesign: pkg.learningDesign, supportingSourceContext: pkg.supportingSourceContext, target, targetState: payload.targetState } satisfies Extract<FirstResponseResult, { status: "CORRECTION_REQUIRED" }>;
  const result = evaluateCorrection(first, correctionResponse, null);
  const row = await store.createOnce(anchorRow(secret, ownerId, pkg, { branch: "CORRECTION", initialInteractionDigest: payload.initialInteractionDigest, response: result.correctionResponse, status: result.status }));
  return { result, anchor: validateAnchor(row, ownerId, pkg) } as const;
}
export async function requireCompletionAnchor(store: Pick<CompletionAnchorStore, "find">, ownerId: string, pkg: ApprovedAuthorityPackage) { if (!ownerId.trim()) throw new Error("Completion anchor retrieval requires an authenticated owner."); const row = await store.find(ownerId, requireApprovedLearningDesign(pkg.learningDesign).identity); if (!row) throw new Error("No completion anchor is available."); return validateAnchor(row, ownerId, pkg); }

export async function requireCompletionAnchorForExactTimestampParsing(store: Pick<CompletionAnchorStore, "find">, ownerId: string, pkg: ApprovedAuthorityPackage) {
  if (!ownerId.trim()) throw new Error("Completion anchor retrieval requires an authenticated owner.");
  const row = await store.find(ownerId, requireApprovedLearningDesign(pkg.learningDesign).identity);
  if (!row) throw new Error("No completion anchor is available.");
  const expected = authority(ownerId, pkg);
  if (row.owner_id !== expected.ownerId || row.package_identity !== expected.packageIdentity || row.approved_learning_design_identity !== expected.approvedLearningDesignIdentity || row.approved_learning_design_snapshot !== expected.approvedLearningDesignSnapshot || row.response_evaluation_contract_identity !== expected.responseEvaluationContractIdentity || row.response_evaluation_contract_snapshot !== expected.responseEvaluationContractSnapshot || row.retrieval_interaction_identity !== expected.retrievalInteractionIdentity || !/^[0-9a-f]{64}$/.test(row.terminal_interaction_digest) || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(row.completion_anchor_identity) || typeof row.completed_at !== "string" || row.completed_at.length === 0) invalid();
  const completionAnchorSnapshot = Object.freeze({ ...expected, terminalInteractionDigest: row.terminal_interaction_digest, completedAt: row.completed_at }) satisfies CompletionAnchorSnapshot;
  return Object.freeze({ ...expected, completedAt: row.completed_at, completionAnchorIdentity: row.completion_anchor_identity, completionAnchorSnapshot });
}

export class SupabaseCompletionAnchorStore implements CompletionAnchorStore {
  constructor(private readonly supabase: SupabaseClient<Database>) {}
  async find(ownerId: string, packageIdentity: string) { const { data, error } = await this.supabase.from("approved_retrieval_completion_anchors").select("*").eq("owner_id", ownerId).eq("package_identity", packageIdentity).maybeSingle(); if (error) throw new Error("Completion anchor retrieval failed closed."); return data as CompletionAnchorRow | null; }
  async createOnce(row: Omit<CompletionAnchorRow, "completion_anchor_identity" | "completed_at">) { const { data, error } = await this.supabase.rpc("create_retrieval_completion_anchor_once", { p_owner_id: row.owner_id, p_package_identity: row.package_identity, p_approved_learning_design_identity: row.approved_learning_design_identity, p_approved_learning_design_snapshot: row.approved_learning_design_snapshot, p_response_evaluation_contract_identity: row.response_evaluation_contract_identity, p_response_evaluation_contract_snapshot: row.response_evaluation_contract_snapshot, p_retrieval_interaction_identity: row.retrieval_interaction_identity, p_terminal_interaction_digest: row.terminal_interaction_digest }).single(); if (error || !data) throw new Error("Completion anchor creation failed closed."); return data as CompletionAnchorRow; }
}

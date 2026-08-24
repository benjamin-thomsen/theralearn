"use server";

import { evaluateCorrectionAndComplete, evaluateInitialAndComplete, SupabaseCompletionAnchorStore } from "../../lib/completion-anchor/completionAnchorRepository";
import { requireOwnedApprovedAuthorityPackage, SupabaseApprovedPackageReader } from "../../lib/approved-package/approvedPackageRepository";
import { createClient } from "../../lib/supabase/server";
import { createServiceRoleClient } from "../../lib/supabase/serviceRole";
import type { RequiredResponseElement } from "../../lib/learning-science/types";

type VisibleFirstResult =
  | { status: "NO_CORRECTION_REQUIRED"; learnerResponse: string; supportingSourceContext: string; completionAnchor: unknown }
  | { status: "INDETERMINATE"; learnerResponse: string; supportingSourceContext: string }
  | { status: "EVALUATION_FAILURE"; learnerResponse: string; supportingSourceContext: string; message: string }
  | { status: "CORRECTION_REQUIRED"; learnerResponse: string; supportingSourceContext: string; target: Readonly<RequiredResponseElement>; correctionReceipt: string };

function signingSecret() {
  const secret = process.env.COMPLETION_RECEIPT_SIGNING_SECRET;
  if (!secret) throw new Error("Completion receipt signing is unavailable.");
  return secret;
}

async function authority() {
  const session = await createClient();
  const { data: { user } } = await session.auth.getUser();
  if (!user) throw new Error("Learner retrieval requires authentication.");
  const pkg = await requireOwnedApprovedAuthorityPackage(new SupabaseApprovedPackageReader(session), user.id);
  return { user, pkg };
}

export async function submitInitialApprovedRetrieval(learnerResponse: string): Promise<VisibleFirstResult> {
  const { user, pkg } = await authority();
  const outcome = await evaluateInitialAndComplete(new SupabaseCompletionAnchorStore(createServiceRoleClient()), signingSecret(), user.id, pkg, learnerResponse);
  const result = outcome.result;
  if (result.status === "CORRECTION_REQUIRED") {
    if (!outcome.correctionReceipt) throw new Error("Correction continuity is unavailable.");
    return { status: result.status, learnerResponse: result.learnerResponse, supportingSourceContext: result.supportingSourceContext, target: result.target, correctionReceipt: outcome.correctionReceipt };
  }
  if (result.status === "EVALUATION_FAILURE") return { status: result.status, learnerResponse: result.learnerResponse, supportingSourceContext: result.supportingSourceContext, message: result.message };
  if (result.status === "NO_CORRECTION_REQUIRED") return { status: result.status, learnerResponse: result.learnerResponse, supportingSourceContext: result.supportingSourceContext, completionAnchor: outcome.anchor };
  return { status: result.status, learnerResponse: result.learnerResponse, supportingSourceContext: result.supportingSourceContext };
}

export async function submitTerminalCorrection(correctionReceipt: string, correctionResponse: string) {
  const { user, pkg } = await authority();
  const outcome = await evaluateCorrectionAndComplete(new SupabaseCompletionAnchorStore(createServiceRoleClient()), signingSecret(), user.id, pkg, correctionReceipt, correctionResponse);
  const result = outcome.result;
  return { status: result.status, correctionResponse: result.correctionResponse, completionAnchor: outcome.anchor, ...(result.message ? { message: result.message } : {}) };
}

"use server";

import { extractSourceMaterial } from "@/lib/subject-matter-intake/extractSourceMaterial";
import { extractTextFromPdf } from "@/lib/subject-matter-intake/extractTextFromPdf";
import { validateObjectiveAnalysisCandidate } from "@/lib/subject-matter-intake/objectiveAnalysis";
import { OpenAiObjectiveAnalysisProvider } from "@/lib/subject-matter-intake/openAiObjectiveAnalysisProvider";
import { OpenAiSourceGroundingReassessmentProvider } from "@/lib/subject-matter-intake/openAiSourceGroundingReassessmentProvider";
import {
  approveObjectiveCandidate,
  changeObjectiveProposal,
  makeObjectiveCandidateReviewable,
  rejectObjectiveCandidate,
  type ObjectiveProposal,
  type ReviewableObjectiveCandidate,
} from "@/lib/subject-matter-intake/objectiveProposal";
import type { ExtractedSourceMaterial } from "@/lib/subject-matter-intake/extractSourceMaterial";
import { formBoundedRelevantContext } from "@/lib/subject-matter-intake/relevantContext";
import { handoffToLearningScience } from "@/lib/subject-matter-intake/handoffToLearningScience";
import type { AcceptedObjectiveWithRelevantContext } from "@/lib/subject-matter-intake/relevantContext";
import {
  deriveOutcomeFromChangedDurableRetentionPremise,
  rederiveLearningDesignFromChangedDescription,
} from "./learningDesignChange";
import type { PreApprovalAuthorityPackageInput } from "@/lib/approved-package/approvedPackageRepository";
import {
  approvePreApprovalAuthorityPackage,
  createOnceOrReturnIdentical,
  SupabaseApprovedPackageStore,
} from "@/lib/approved-package/approvedPackageRepository";
import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/serviceRole";

async function requireAuthenticatedCreator() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Creator workflow requires authentication.");
  return { supabase, user };
}

export async function reassessCreatorObjectiveChange(
  proposal: ObjectiveProposal,
  statement: string,
  sourceMaterial: ExtractedSourceMaterial,
) {
  await requireAuthenticatedCreator();
  const candidate = changeObjectiveProposal(proposal, statement);
  const provider = new OpenAiSourceGroundingReassessmentProvider();
  const reassessment = await provider.reassessSourceGrounding(
    candidate,
    sourceMaterial,
  );

  return makeObjectiveCandidateReviewable(candidate, reassessment);
}

export async function rejectCreatorObjective(
  candidate: ReviewableObjectiveCandidate,
) {
  await requireAuthenticatedCreator();
  return rejectObjectiveCandidate(candidate);
}

export async function approveCreatorObjectiveAndDeriveLearningDesign(
  candidate: ReviewableObjectiveCandidate,
  contextDescription: string,
  durableRetentionOfPreviouslyAcquiredKnowledgeIntended: boolean,
) {
  await requireAuthenticatedCreator();
  const acceptedLearningObjective = approveObjectiveCandidate(candidate);
  const acceptedHandoff = formBoundedRelevantContext(
    acceptedLearningObjective,
    contextDescription,
    durableRetentionOfPreviouslyAcquiredKnowledgeIntended,
  );

  return {
    acceptedHandoff,
    learningDesign: handoffToLearningScience(acceptedHandoff),
  };
}

export async function rederiveCreatorLearningDesign(
  acceptedHandoff: AcceptedObjectiveWithRelevantContext,
  changedDescription: string,
) {
  await requireAuthenticatedCreator();
  return rederiveLearningDesignFromChangedDescription(
    acceptedHandoff,
    changedDescription,
  );
}

export async function determineCreatorLearningDesignApplicability(
  acceptedHandoff: AcceptedObjectiveWithRelevantContext,
) {
  await requireAuthenticatedCreator();
  return deriveOutcomeFromChangedDurableRetentionPremise(acceptedHandoff);
}

export async function analyzeCreatorObjective(formData: FormData) {
  await requireAuthenticatedCreator();
  const fileValue = formData.get("pdf");

  if (!(fileValue instanceof File)) {
    throw new Error("Objective analysis requires one PDF file.");
  }

  if (fileValue.type !== "application/pdf") {
    throw new Error("Objective analysis requires a PDF file.");
  }

  const pdfBytes = new Uint8Array(await fileValue.arrayBuffer());
  const sourceDocument = await extractTextFromPdf(pdfBytes);
  const sourceMaterial = extractSourceMaterial(sourceDocument);

  const provider = new OpenAiObjectiveAnalysisProvider();
  const candidate = await provider.analyzeObjective(sourceMaterial);

  const proposal = validateObjectiveAnalysisCandidate(candidate, sourceMaterial);

  return {
    proposal,
    sourceMaterial,
    supportingSourceContext: sourceMaterial.text.slice(
      proposal.supportingSourceBoundary.startOffset,
      proposal.supportingSourceBoundary.endOffset,
    ),
  };
}

export async function persistApprovedAuthorityPackage(
  preApprovalInput: PreApprovalAuthorityPackageInput,
) {
  const { user } = await requireAuthenticatedCreator();
  const serverApprovedPackage = approvePreApprovalAuthorityPackage(preApprovalInput);
  const persistenceClient = createServiceRoleClient();
  const persisted = await createOnceOrReturnIdentical(
    new SupabaseApprovedPackageStore(persistenceClient),
    user.id,
    serverApprovedPackage,
  );
  return {
    packageIdentity: persisted.learningDesign.identity,
  };
}

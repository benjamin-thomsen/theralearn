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

export async function reassessCreatorObjectiveChange(
  proposal: ObjectiveProposal,
  statement: string,
  sourceMaterial: ExtractedSourceMaterial,
) {
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
  return rejectObjectiveCandidate(candidate);
}

export async function approveCreatorObjectiveAndDeriveLearningDesign(
  candidate: ReviewableObjectiveCandidate,
  contextDescription: string,
  durableRetentionOfPreviouslyAcquiredKnowledgeIntended: boolean,
) {
  const acceptedLearningObjective = approveObjectiveCandidate(candidate);
  const acceptedHandoff = formBoundedRelevantContext(
    acceptedLearningObjective,
    contextDescription,
    durableRetentionOfPreviouslyAcquiredKnowledgeIntended,
  );

  return handoffToLearningScience(acceptedHandoff);
}

export async function analyzeCreatorObjective(formData: FormData) {
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

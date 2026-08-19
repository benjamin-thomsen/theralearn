"use server";

import { extractSourceMaterial } from "@/lib/subject-matter-intake/extractSourceMaterial";
import { extractTextFromPdf } from "@/lib/subject-matter-intake/extractTextFromPdf";
import { validateObjectiveAnalysisCandidate } from "@/lib/subject-matter-intake/objectiveAnalysis";
import { OpenAiObjectiveAnalysisProvider } from "@/lib/subject-matter-intake/openAiObjectiveAnalysisProvider";

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
    supportingSourceContext: sourceMaterial.text.slice(
      proposal.supportingSourceBoundary.startOffset,
      proposal.supportingSourceBoundary.endOffset,
    ),
  };
}

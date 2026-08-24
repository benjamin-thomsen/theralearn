"use client";

import { FormEvent, useState } from "react";

import { requireApprovedLearningDesign } from "../lib/learning-science/learningDesignExecution";
import { evaluateFirstResponse } from "../lib/learning-science/responseEvaluation";
import type { RequiredResponseElement } from "../lib/learning-science/types";
import type { LearningDesign } from "../lib/learning-science/types";

type ApprovedCreatorRetrievalExperienceProps = {
  learningDesign: LearningDesign;
  supportingSourceContext: string;
  submitInitial?: (response: string) => Promise<VisibleFirstResult>;
  submitCorrection?: (correctionReceipt: string, correctionResponse: string) => Promise<VisibleCorrectionResult>;
};

type VisibleFirstResult =
  | { status: "NO_CORRECTION_REQUIRED"; learnerResponse: string; supportingSourceContext: string; completionAnchor: unknown }
  | { status: "INDETERMINATE"; learnerResponse: string; supportingSourceContext: string }
  | { status: "EVALUATION_FAILURE"; learnerResponse: string; supportingSourceContext: string; message: string }
  | { status: "CORRECTION_REQUIRED"; learnerResponse: string; supportingSourceContext: string; target: Readonly<RequiredResponseElement>; correctionReceipt: string };

export function createSourceGroundedRetrievalResult(
  learningDesign: LearningDesign,
  learnerResponse: string,
  supportingSourceContext: string,
) {
  return evaluateFirstResponse(learningDesign, learnerResponse, supportingSourceContext);
}

type VisibleCorrectionResult = { status: "CORRECTED" | "NOT_CORRECTED" | "INDETERMINATE" | "EVALUATION_FAILURE"; correctionResponse: string; completionAnchor?: unknown; message?: string };

export function TerminalCorrectionOutcome({ result }: { result: VisibleCorrectionResult }) {
  return (
    <div aria-live="polite">
      <p>Korrektionsresultat: {result.status}</p>
      {result.status === "EVALUATION_FAILURE" ? <p>{result.message}</p> : null}
    </div>
  );
}

export default function ApprovedCreatorRetrievalExperience({
  learningDesign,
  supportingSourceContext,
  submitInitial,
  submitCorrection,
}: ApprovedCreatorRetrievalExperienceProps) {
  const approvedDesign = requireApprovedLearningDesign(learningDesign);
  const [learnerResponse, setLearnerResponse] = useState("");
  const [result, setResult] = useState<VisibleFirstResult | null>(null);
  const [correctionResponse, setCorrectionResponse] = useState("");
  const [correctionResult, setCorrectionResult] = useState<VisibleCorrectionResult | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!submitInitial) throw new Error("Trusted server retrieval boundary is unavailable.");
    setResult(await submitInitial(learnerResponse));
  }

  return (
    <section aria-labelledby="approved-retrieval-heading">
      <p className="state">{approvedDesign.state}</p>
      <h3 id="approved-retrieval-heading">Godkendt retrieval-aktivitet</h3>
      <p>
        Beskriv med egne ord: {approvedDesign.learningObjective.statement}
      </p>

      <form onSubmit={handleSubmit}>
        <label style={{ display: "block" }}>
          Dit svar
          <textarea
            value={learnerResponse}
            onChange={(event) => setLearnerResponse(event.target.value)}
            disabled={Boolean(result)}
          />
        </label>
        {!result ? (
          <button type="submit" disabled={!learnerResponse.trim()}>
            Indsend svar og se feedback
          </button>
        ) : null}
      </form>

      {result ? (
        <div aria-live="polite">
          <h4>Feedback</h4>
          <p>Dit aktive svar:</p>
          <blockquote>{result.learnerResponse}</blockquote>
          <p>Sammenlign dit svar med den godkendte kildekontekst:</p>
          <blockquote>{result.supportingSourceContext}</blockquote>
          <p>Resultat: {result.status}</p>
          {result.status === "EVALUATION_FAILURE" ? <p>{result.message}</p> : null}
          {result.status === "CORRECTION_REQUIRED" ? (
            <>
              <h4>Informativ feedback</h4>
              <p>{result.target.informativeFeedback}</p>
              <form onSubmit={async (event) => {
                event.preventDefault();
                if (correctionResult) throw new Error("The single correction attempt has already reached a terminal outcome.");
                if (!submitCorrection) throw new Error("Trusted server correction boundary is unavailable.");
                setCorrectionResult(await submitCorrection(result.correctionReceipt, correctionResponse));
              }}>
                <label style={{ display: "block" }}>
                  Dit korrigerede svar
                  <textarea value={correctionResponse} onChange={(event) => setCorrectionResponse(event.target.value)} disabled={Boolean(correctionResult)} />
                </label>
                {!correctionResult ? <button type="submit" disabled={!correctionResponse.trim()}>Indsend én korrektion</button> : null}
              </form>
              {correctionResult ? <TerminalCorrectionOutcome result={correctionResult} /> : null}
            </>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

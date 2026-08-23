"use client";

import { FormEvent, useState } from "react";

import { requireApprovedLearningDesign } from "../lib/learning-science/learningDesignExecution";
import type { LearningDesign } from "../lib/learning-science/types";

type ApprovedCreatorRetrievalExperienceProps = {
  learningDesign: LearningDesign;
  supportingSourceContext: string;
};

export function createSourceGroundedRetrievalResult(
  learningDesign: LearningDesign,
  learnerResponse: string,
  supportingSourceContext: string,
) {
  const approvedDesign = requireApprovedLearningDesign(learningDesign);

  if (approvedDesign.proposedLearningMechanism.kind !== "bounded-retrieval") {
    throw new Error(
      "Approved learning design does not authorize the bounded retrieval mechanism.",
    );
  }

  const response = learnerResponse.trim();
  const sourceContext = supportingSourceContext.trim();

  if (!response) {
    throw new Error("The learner must provide an active response before reveal.");
  }

  if (!sourceContext) {
    throw new Error("Source-grounded feedback requires supporting source context.");
  }

  return {
    learnerResponse: response,
    supportingSourceContext: sourceContext,
  };
}

export default function ApprovedCreatorRetrievalExperience({
  learningDesign,
  supportingSourceContext,
}: ApprovedCreatorRetrievalExperienceProps) {
  const approvedDesign = requireApprovedLearningDesign(learningDesign);
  const [learnerResponse, setLearnerResponse] = useState("");
  const [result, setResult] = useState<ReturnType<
    typeof createSourceGroundedRetrievalResult
  > | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(
      createSourceGroundedRetrievalResult(
        approvedDesign,
        learnerResponse,
        supportingSourceContext,
      ),
    );
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
        </div>
      ) : null}
    </section>
  );
}

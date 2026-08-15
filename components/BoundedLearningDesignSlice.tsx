"use client";

import { useState } from "react";

import ApprovedRetrievalExperience from "./ApprovedRetrievalExperience";
import { deriveLearningDesign } from "../lib/learning-science/deriveLearningDesign";
import {
  approveLearningDesign,
  invalidateLearningDesign,
} from "../lib/learning-science/learningDesignLifecycle";
import type { LearningDesign } from "../lib/learning-science/types";

type BoundedLearningDesignSliceProps = {
  initialLearningObjective: string;
  initialRelevantContext: string;
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string | null;
};

export default function BoundedLearningDesignSlice({
  initialLearningObjective,
  initialRelevantContext,
  id,
  question,
  options,
  correct_answer,
  explanation,
}: BoundedLearningDesignSliceProps) {
  const [learningObjective, setLearningObjective] = useState(
    initialLearningObjective,
  );
  const [relevantContext, setRelevantContext] = useState(
    initialRelevantContext,
  );
  const [
    durableRetentionOfPreviouslyAcquiredKnowledgeIntended,
    setDurableRetentionOfPreviouslyAcquiredKnowledgeIntended,
  ] = useState(false);
  const [design, setDesign] = useState<LearningDesign | null>(null);

  function invalidateCurrentDesign() {
    setDesign((nextDesign) => {
      if (!nextDesign || nextDesign.state === "INVALIDATED") {
        return nextDesign;
      }

      return invalidateLearningDesign(nextDesign);
    });
  }

  function handleLearningObjectiveChange(value: string) {
    setLearningObjective(value);
    invalidateCurrentDesign();
  }

  function handleRelevantContextChange(value: string) {
    setRelevantContext(value);
    invalidateCurrentDesign();
  }

  function handleDurableRetentionChange(value: boolean) {
    setDurableRetentionOfPreviouslyAcquiredKnowledgeIntended(value);
    invalidateCurrentDesign();
  }

  function derive() {
    setDesign(
      deriveLearningDesign({
        learningObjective: { statement: learningObjective },
        relevantContext: {
          description: relevantContext,
          durableRetentionOfPreviouslyAcquiredKnowledgeIntended,
        },
      }),
    );
  }

  function approve() {
    setDesign((nextDesign) =>
      nextDesign?.state === "PROPOSED"
        ? approveLearningDesign(nextDesign)
        : nextDesign,
    );
  }

  const canDerive =
    learningObjective.trim().length > 0 &&
    relevantContext.trim().length > 0 &&
    durableRetentionOfPreviouslyAcquiredKnowledgeIntended;

  return (
    <section aria-labelledby="learning-design-heading">
      <h2 id="learning-design-heading">Learning design</h2>

      <label style={{ display: "block" }}>
        Learning objective
        <textarea
          value={learningObjective}
          onChange={(event) => handleLearningObjectiveChange(event.target.value)}
        />
      </label>

      <label style={{ display: "block" }}>
        Relevant context
        <textarea
          value={relevantContext}
          onChange={(event) => handleRelevantContextChange(event.target.value)}
        />
      </label>

      <label style={{ display: "block" }}>
        <input
          type="checkbox"
          checked={durableRetentionOfPreviouslyAcquiredKnowledgeIntended}
          onChange={(event) =>
            handleDurableRetentionChange(event.target.checked)
          }
        />
        Durable retention of previously acquired knowledge is an intended
        learning outcome
      </label>

      <p>Design state: {design?.state ?? "NOT DERIVED"}</p>

      {!durableRetentionOfPreviouslyAcquiredKnowledgeIntended && (
        <p>
          Active Retrieval is not applicable in this bounded slice unless
          durable retention of previously acquired knowledge is an intended
          learning outcome.
        </p>
      )}

      {!design && (
        <button type="button" onClick={derive} disabled={!canDerive}>
          Derive learning design
        </button>
      )}

      {design && (
        <>
          <p>Scientific rationale: {design.learningScienceRationale}</p>

          <h3>Learning requirements</h3>
          <ul>
            {design.learningRequirements.map((requirement) => (
              <li key={requirement.description}>{requirement.description}</li>
            ))}
          </ul>

          <p>
            Proposed mechanism: {design.proposedLearningMechanism.description}
          </p>
        </>
      )}

      {design?.state === "PROPOSED" && (
        <button type="button" onClick={approve}>
          Approve learning design
        </button>
      )}

      {design?.state === "INVALIDATED" && (
        <button type="button" onClick={derive} disabled={!canDerive}>
          Re-derive learning design
        </button>
      )}

      {design?.state === "APPROVED" && (
        <ApprovedRetrievalExperience
          learningDesign={design}
          id={id}
          question={question}
          options={options}
          correct_answer={correct_answer}
          explanation={explanation}
        />
      )}
    </section>
  );
}

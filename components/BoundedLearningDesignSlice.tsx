"use client";

import { useState } from "react";

import ApprovedRetrievalExperience from "./ApprovedRetrievalExperience";
import { deriveLearningDesign } from "../lib/learning-science/deriveLearningDesign";
import {
  approveLearningDesign,
  invalidateLearningDesign,
  rejectLearningDesign,
} from "../lib/learning-science/learningDesignLifecycle";
import {
  createAuthorityIdentity,
  formResponseEvaluationContract,
  reviewResponseEvaluationContract,
} from "../lib/learning-science/responseEvaluationContract";
import {
  formLaterRetrievalPrerequisite,
  relevantContextIdentity,
  reviewLaterRetrievalPrerequisite,
} from "../lib/learning-science/laterRetrievalPrerequisite";
import type {
  LaterRetrievalPrerequisiteDraft,
  LearningDesign,
  ProposedLearningDesign,
  ResponseEvaluationContract,
} from "../lib/learning-science/types";

type BoundedLearningDesignSliceProps = {
  creatorAuthorityReference: string | null;
  initialLearningObjective: string;
  initialRelevantContext: string;
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string | null;
};

export function approveReviewedBoundedLearningDesign(
  design: ProposedLearningDesign,
  contract: ResponseEvaluationContract,
  sourceGroundedAndSuitableConfirmed: boolean,
  prerequisite: LaterRetrievalPrerequisiteDraft | null,
  completePrerequisiteConfirmed: boolean,
) {
  if (!prerequisite) {
    throw new Error(
      "Learning Design approval requires the exact reviewed Later Retrieval Prerequisite.",
    );
  }

  return approveLearningDesign(
    design,
    reviewResponseEvaluationContract(
      design,
      contract,
      sourceGroundedAndSuitableConfirmed,
    ),
    reviewLaterRetrievalPrerequisite(
      design,
      prerequisite,
      completePrerequisiteConfirmed,
    ),
  );
}

export default function BoundedLearningDesignSlice({
  creatorAuthorityReference,
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
  const [contractDraft, setContractDraft] =
    useState<ResponseEvaluationContract | null>(null);
  const [contractClaim, setContractClaim] = useState("");
  const [acceptedFormulations, setAcceptedFormulations] = useState("");
  const [contradictingFormulations, setContradictingFormulations] =
    useState("");
  const [contractFeedback, setContractFeedback] = useState("");
  const [contractReviewed, setContractReviewed] = useState(false);
  const [laterRetrievalPrerequisite, setLaterRetrievalPrerequisite] =
    useState<LaterRetrievalPrerequisiteDraft | null>(null);
  const [earliestEligibilityDelay, setEarliestEligibilityDelay] = useState("");
  const [earliestEligibilityUnit, setEarliestEligibilityUnit] =
    useState<"HOURS" | "DAYS">("DAYS");
  const [laterRetrievalPrerequisiteReviewed, setLaterRetrievalPrerequisiteReviewed] =
    useState(false);
  const [approvalError, setApprovalError] = useState("");

  function resetContractFormation() {
    setContractDraft(null);
    setContractClaim("");
    setAcceptedFormulations("");
    setContradictingFormulations("");
    setContractFeedback("");
    setContractReviewed(false);
    setLaterRetrievalPrerequisite(null);
    setEarliestEligibilityDelay("");
    setEarliestEligibilityUnit("DAYS");
    setLaterRetrievalPrerequisiteReviewed(false);
    setApprovalError("");
  }

  function invalidateCurrentDesign() {
    resetContractFormation();
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
    resetContractFormation();
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
    setApprovalError("");
    try {
      setDesign((nextDesign) =>
        nextDesign?.state === "PROPOSED" && contractDraft && laterRetrievalPrerequisite
          ? approveReviewedBoundedLearningDesign(
              nextDesign,
              contractDraft,
              contractReviewed,
              laterRetrievalPrerequisite,
              laterRetrievalPrerequisiteReviewed,
            )
          : nextDesign,
      );
    } catch (cause) {
      setApprovalError(
        cause instanceof Error
          ? cause.message
          : "Learning Design approval failed.",
      );
    }
  }

  function formPrerequisite() {
    if (design?.state !== "PROPOSED" || !contractDraft) return;
    setApprovalError("");
    try {
      if (!creatorAuthorityReference?.trim()) {
        throw new Error(
          "Later Retrieval Prerequisite requires an authenticated Creator/Content Owner authority reference.",
        );
      }
      setLaterRetrievalPrerequisite(
        formLaterRetrievalPrerequisite(design, {
          identity: crypto.randomUUID(),
          proposedLearningDesignIdentity: design.identity,
          learningObjectiveIdentity: design.learningObjectiveIdentity,
          relevantContextIdentity: relevantContextIdentity(design),
          supportingSourceBoundaryIdentity: contractDraft.supportingSource.identity,
          earliestEligibilityDelay: {
            value: Number(earliestEligibilityDelay),
            unit: earliestEligibilityUnit,
          },
          creatorAuthorityReference,
        }),
      );
      setLaterRetrievalPrerequisiteReviewed(false);
    } catch (cause) {
      setApprovalError(
        cause instanceof Error
          ? cause.message
          : "Later Retrieval Prerequisite formation failed.",
      );
    }
  }

  function formContract() {
    if (design?.state !== "PROPOSED") return;

    setApprovalError("");
    try {
      const boundary = { startOffset: 0, endOffset: relevantContext.length };
      setContractDraft(
        formResponseEvaluationContract(
          design,
          {
            identity: crypto.randomUUID(),
            learningObjectiveIdentity: design.learningObjectiveIdentity,
            supportingSource: {
              identity: createAuthorityIdentity("source", {
                context: relevantContext,
                boundary,
              }),
              boundary,
            },
            correctionRequirementReference:
              design.feedbackResultRequirement.description,
            requiredResponseElements: [
              {
                identity: crypto.randomUUID(),
                claim: contractClaim,
                acceptedFormulations: acceptedFormulations.split("\n"),
                contradictingFormulations: contradictingFormulations
                  ? contradictingFormulations.split("\n")
                  : [],
                informativeFeedback: contractFeedback,
              },
            ],
          },
          relevantContext,
        ),
      );
      setContractReviewed(false);
    } catch (cause) {
      setApprovalError(
        cause instanceof Error ? cause.message : "Contract formation failed.",
      );
    }
  }

  function reject() {
    setDesign((nextDesign) =>
      nextDesign?.state === "PROPOSED"
        ? rejectLearningDesign(nextDesign)
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
        <>
          <section aria-labelledby="bounded-response-contract-heading">
            <h3 id="bounded-response-contract-heading">
              Response Evaluation Contract
            </h3>
            {!contractDraft ? (
              <>
                <p>
                  Creator/Content Owner authors every subject-matter-bearing
                  field. Enter one formulation per line.
                </p>
                <label style={{ display: "block" }}>
                  Source-grounded required claim
                  <textarea
                    value={contractClaim}
                    onChange={(event) => setContractClaim(event.target.value)}
                  />
                </label>
                <label style={{ display: "block" }}>
                  Accepted formulations
                  <textarea
                    value={acceptedFormulations}
                    onChange={(event) =>
                      setAcceptedFormulations(event.target.value)
                    }
                  />
                </label>
                <label style={{ display: "block" }}>
                  Contradicting formulations (optional)
                  <textarea
                    value={contradictingFormulations}
                    onChange={(event) =>
                      setContradictingFormulations(event.target.value)
                    }
                  />
                </label>
                <label style={{ display: "block" }}>
                  Informative source-grounded feedback
                  <textarea
                    value={contractFeedback}
                    onChange={(event) => setContractFeedback(event.target.value)}
                  />
                </label>
                <button type="button" onClick={formContract}>
                  Form contract draft
                </button>
              </>
            ) : (
              <>
                <p>Contract identity: {contractDraft.identity}</p>
                <p>
                  Proposed Learning Design identity:{" "}
                  {contractDraft.proposedLearningDesignIdentity}
                </p>
                <p>
                  Learning Objective identity:{" "}
                  {contractDraft.learningObjectiveIdentity}
                </p>
                <p>Learning Objective: {design.learningObjective.statement}</p>
                <p>Source identity: {contractDraft.supportingSource.identity}</p>
                <p>
                  Immutable source boundary:{" "}
                  {contractDraft.supportingSource.boundary.startOffset}–
                  {contractDraft.supportingSource.boundary.endOffset}
                </p>
                <blockquote>{relevantContext}</blockquote>
                <p>
                  Correction requirement:{" "}
                  {contractDraft.correctionRequirementReference}
                </p>
                <p>Mechanism: {contractDraft.mechanism}</p>
                {contractDraft.requiredResponseElements.map((element, index) => (
                  <div key={element.identity}>
                    <h4>Required element {index + 1}</h4>
                    <p>{element.claim}</p>
                    <p>Accepted: {element.acceptedFormulations.join("; ")}</p>
                    <p>
                      Contradicting:{" "}
                      {element.contradictingFormulations.join("; ") || "None"}
                    </p>
                    <p>Feedback: {element.informativeFeedback}</p>
                  </div>
                ))}
                <label>
                  <input
                    type="checkbox"
                    checked={contractReviewed}
                    onChange={(event) =>
                      setContractReviewed(event.target.checked)
                    }
                  />
                  I confirm this complete contract is source-grounded and
                  suitable for this Learning Design
                </label>
                <button type="button" onClick={resetContractFormation}>
                  Change contract
                </button>
              </>
            )}
          </section>
          {contractDraft && (
            <section aria-labelledby="bounded-later-retrieval-prerequisite-heading">
              <h3 id="bounded-later-retrieval-prerequisite-heading">
                Later Retrieval Prerequisite
              </h3>
              {!laterRetrievalPrerequisite ? (
                <>
                  <label style={{ display: "block" }}>
                    Positive whole-number delay
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={earliestEligibilityDelay}
                      onChange={(event) =>
                        setEarliestEligibilityDelay(event.target.value)
                      }
                    />
                  </label>
                  <label style={{ display: "block" }}>
                    Delay unit
                    <select
                      value={earliestEligibilityUnit}
                      onChange={(event) =>
                        setEarliestEligibilityUnit(
                          event.target.value as "HOURS" | "DAYS",
                        )
                      }
                    >
                      <option value="HOURS">Hours</option>
                      <option value="DAYS">Days</option>
                    </select>
                  </label>
                  <button type="button" onClick={formPrerequisite}>
                    Form prerequisite draft
                  </button>
                </>
              ) : (
                <>
                  <p>
                    Creator authority: {laterRetrievalPrerequisite.creatorAuthorityReference}
                  </p>
                  <p>
                    Earliest eligibility delay: {laterRetrievalPrerequisite.earliestEligibilityDelay.value}{" "}
                    {laterRetrievalPrerequisite.earliestEligibilityDelay.unit}
                  </p>
                  <label>
                    <input
                      type="checkbox"
                      checked={laterRetrievalPrerequisiteReviewed}
                      onChange={(event) =>
                        setLaterRetrievalPrerequisiteReviewed(event.target.checked)
                      }
                    />
                    I confirm this complete prerequisite and timing boundary with
                    this Learning Design
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setLaterRetrievalPrerequisite(null);
                      setLaterRetrievalPrerequisiteReviewed(false);
                    }}
                  >
                    Change prerequisite
                  </button>
                </>
              )}
            </section>
          )}
          {approvalError && <p role="alert">{approvalError}</p>}
          <button
            type="button"
            onClick={approve}
            disabled={
              !contractDraft ||
              !contractReviewed ||
              !laterRetrievalPrerequisite ||
              !laterRetrievalPrerequisiteReviewed
            }
          >
            Approve learning design
          </button>
          <button type="button" onClick={reject}>
            Reject learning design
          </button>
        </>
      )}

      {design?.state === "REJECTED" && (
        <p>Learning design rejected. Learner execution is not authorized.</p>
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

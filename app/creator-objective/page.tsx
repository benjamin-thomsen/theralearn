"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import ApprovedCreatorRetrievalExperience from "@/components/ApprovedCreatorRetrievalExperience";
import {
  approveLearningDesign,
  rejectLearningDesign,
} from "@/lib/learning-science/learningDesignLifecycle";
import type { LearningDesign } from "@/lib/learning-science/types";
import type { AcceptedObjectiveWithRelevantContext } from "@/lib/subject-matter-intake/relevantContext";
import {
  analyzeCreatorObjective,
  approveCreatorObjectiveAndDeriveLearningDesign,
  reassessCreatorObjectiveChange,
  rejectCreatorObjective,
  rederiveCreatorLearningDesign,
} from "./actions";
import { changeRelevantContextDescription } from "./learningDesignChange";
import styles from "./page.module.css";

type ObjectiveAnalysisResult = Awaited<ReturnType<typeof analyzeCreatorObjective>>;
type ReviewableObjective = Awaited<ReturnType<typeof reassessCreatorObjectiveChange>>;
type RejectedObjective = Awaited<ReturnType<typeof rejectCreatorObjective>>;

export default function CreatorObjectivePage() {
  const [result, setResult] = useState<ObjectiveAnalysisResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [objectiveStatement, setObjectiveStatement] = useState("");
  const [reviewableObjective, setReviewableObjective] = useState<ReviewableObjective | null>(null);
  const [rejectedObjective, setRejectedObjective] = useState<RejectedObjective | null>(null);
  const [contextDescription, setContextDescription] = useState("");
  const [durableRetentionIntended, setDurableRetentionIntended] = useState(false);
  const [learningDesign, setLearningDesign] = useState<LearningDesign | null>(null);
  const [acceptedHandoff, setAcceptedHandoff] = useState<AcceptedObjectiveWithRelevantContext | null>(null);
  const [hasRederivedLearningDesign, setHasRederivedLearningDesign] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const analysisResult = await analyzeCreatorObjective(formData);
      setResult(analysisResult);
      setObjectiveStatement(analysisResult.proposal.statement);
      setReviewableObjective(null);
      setRejectedObjective(null);
      setContextDescription("");
      setDurableRetentionIntended(false);
      setLearningDesign(null);
      setAcceptedHandoff(null);
      setHasRederivedLearningDesign(false);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Objective analysis failed.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleObjectiveChange() {
    if (!result) return;

    setError("");
    setIsLoading(true);

    try {
      const reviewable = await reassessCreatorObjectiveChange(
        result.proposal,
        objectiveStatement,
        result.sourceMaterial,
      );
      setReviewableObjective(reviewable);
      setRejectedObjective(null);
      setLearningDesign(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Objective reassessment failed.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRejectObjective() {
    if (!reviewableObjective) return;

    setError("");

    try {
      const rejected = await rejectCreatorObjective(reviewableObjective);
      setRejectedObjective(rejected);
      setReviewableObjective(null);
      setLearningDesign(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Objective rejection failed.");
    }
  }

  async function handleApproveObjective() {
    if (!reviewableObjective) return;

    setError("");
    setIsLoading(true);

    try {
      const derived = await approveCreatorObjectiveAndDeriveLearningDesign(
        reviewableObjective,
        contextDescription,
        durableRetentionIntended,
      );
      setAcceptedHandoff(derived.acceptedHandoff);
      setLearningDesign(derived.learningDesign);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Learning Design derivation failed.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleApproveLearningDesign() {
    setLearningDesign((design) =>
      design?.state === "PROPOSED" ? approveLearningDesign(design) : design,
    );
  }

  function handleRejectLearningDesign() {
    setLearningDesign((design) =>
      design?.state === "PROPOSED" ? rejectLearningDesign(design) : design,
    );
  }

  function handleContextDescriptionChange(description: string) {
    setContextDescription(description);

    if (!acceptedHandoff || !learningDesign) return;

    const changed = changeRelevantContextDescription(
      acceptedHandoff,
      learningDesign,
      description,
    );
    setLearningDesign(changed.invalidatedDesign);
  }

  async function handleRederiveLearningDesign() {
    if (!acceptedHandoff || learningDesign?.state !== "INVALIDATED") return;

    setError("");
    setIsLoading(true);

    try {
      const rederived = await rederiveCreatorLearningDesign(
        acceptedHandoff,
        contextDescription,
      );
      setAcceptedHandoff(rederived.acceptedHandoff);
      setLearningDesign(rederived.learningDesign);
      setContextDescription(rederived.acceptedHandoff.relevantContext.description);
      setHasRederivedLearningDesign(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Learning Design re-derivation failed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <Link href="/" className={styles.logo}>TheraLearn</Link>
        <h1 className={styles.title}>Forslag til læringsmål</h1>
        <p className={styles.description}>
          Vælg en tekstbaseret PDF med maskinlæsbar tekst. TheraLearn udtrækker indholdet og foreslår ét læringsmål til din godkendelse.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>PDF-fil</span>
            <input name="pdf" type="file" accept="application/pdf" required />
          </label>

          <button className={styles.button} type="submit" disabled={isLoading}>
            {isLoading ? "Analyserer..." : "Analyser PDF" }
          </button>
        </form>

        {error ? <p className={styles.error} role="alert">{error}</p> : null}

        {result ? (
          <section className={styles.result}>
            <p className={styles.state}>{result.proposal.state}</p>
            <h2>Foreslået læringsmål</h2>
            <label className={styles.field}>
              <span>Læringsmål</span>
              <input
                value={objectiveStatement}
                onChange={(event) => setObjectiveStatement(event.target.value)}
                disabled={isLoading || Boolean(rejectedObjective) || Boolean(learningDesign)}
              />
            </label>
            {!reviewableObjective && !rejectedObjective && !learningDesign ? (
              <button className={styles.button} type="button" onClick={handleObjectiveChange} disabled={isLoading || !objectiveStatement.trim()}>
                {isLoading ? "Revurderer..." : "Revurder læringsmål"}
              </button>
            ) : null}

            {reviewableObjective && !learningDesign ? (
              <section className={styles.result}>
                <p className={styles.state}>{reviewableObjective.state}</p>
                <h3>Review af læringsmål</h3>
                <p>{reviewableObjective.statement}</p>

                <label className={styles.field}>
                  <span>Relevant kontekst</span>
                  <input
                    value={contextDescription}
                    onChange={(event) => setContextDescription(event.target.value)}
                    disabled={isLoading}
                  />
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={durableRetentionIntended}
                    onChange={(event) => setDurableRetentionIntended(event.target.checked)}
                    disabled={isLoading}
                  />{" "}
                  Varig fastholdelse af tidligere tilegnet viden er tilsigtet
                </label>

                <button
                  className={styles.button}
                  type="button"
                  onClick={handleRejectObjective}
                  disabled={isLoading}
                >
                  Afvis læringsmål
                </button>

                <button
                  className={styles.button}
                  type="button"
                  onClick={handleApproveObjective}
                  disabled={isLoading || !contextDescription.trim() || !durableRetentionIntended}
                >
                  {isLoading ? "Afleder Learning Design..." : "Godkend læringsmål"}
                </button>
              </section>
            ) : null}

            {rejectedObjective ? (
              <p className={styles.message}>Læringsmålet er afvist.</p>
            ) : null}

            {learningDesign ? (
              <section className={styles.result}>
                <p className={styles.state}>{learningDesign.state}</p>
                <h2>Foreslået Learning Design</h2>
                <p><strong>Læringsmål:</strong> {learningDesign.learningObjective.statement}</p>
                <p><strong>Relevant kontekst:</strong> {learningDesign.relevantContext.description}</p>
                <p><strong>Varig fastholdelse:</strong> {learningDesign.relevantContext.durableRetentionOfPreviouslyAcquiredKnowledgeIntended ? "Ja" : "Nej"}</p>
                <p><strong>Anvendelige principper:</strong> {learningDesign.applicablePrinciples.join(", ")}</p>
                <p><strong>Learning Science-rationale:</strong> {learningDesign.learningScienceRationale}</p>
                <h3>Læringskrav</h3>
                <ul>{learningDesign.learningRequirements.map((requirement) => <li key={requirement.description}>{requirement.description}</li>)}</ul>
                <p><strong>Foreslået mekanisme:</strong> {learningDesign.proposedLearningMechanism.kind} — {learningDesign.proposedLearningMechanism.description}</p>
                <p><strong>Learner performance requirement:</strong> {learningDesign.learnerPerformanceRequirement.description}</p>
                <p><strong>Feedback result requirement:</strong> {learningDesign.feedbackResultRequirement.description}</p>
                <h3>Creator-controlled decisions</h3>
                <ul>{learningDesign.creatorControlledDecisions.map((decision) => <li key={decision.description}>{decision.description}</li>)}</ul>

                <label className={styles.field}>
                  <span>Ændr Relevant Context-beskrivelse</span>
                  <input
                    value={contextDescription}
                    onChange={(event) => handleContextDescriptionChange(event.target.value)}
                    disabled={isLoading || hasRederivedLearningDesign}
                  />
                </label>

                {learningDesign.state === "PROPOSED" ? (
                  <>
                    <button
                      className={styles.button}
                      type="button"
                      onClick={handleApproveLearningDesign}
                    >
                      Godkend Learning Design
                    </button>
                    <button
                      className={styles.button}
                      type="button"
                      onClick={handleRejectLearningDesign}
                    >
                      Afvis Learning Design
                    </button>
                  </>
                ) : null}

                {learningDesign.state === "INVALIDATED" ? (
                  <>
                    <p className={styles.message}>
                      Learning Design er ugyldiggjort. Learner-udførelse er ikke godkendt.
                    </p>
                    <button
                      className={styles.button}
                      type="button"
                      onClick={handleRederiveLearningDesign}
                      disabled={isLoading || !contextDescription.trim()}
                    >
                      {isLoading ? "Genafleder Learning Design..." : "Genafled Learning Design"}
                    </button>
                  </>
                ) : null}

                {learningDesign.state === "PROPOSED" && hasRederivedLearningDesign ? (
                  <p className={styles.message}>
                    Det friske Learning Design kræver ny eksplicit Creator-godkendelse før Learner-udførelse.
                  </p>
                ) : null}

                {learningDesign.state === "REJECTED" ? (
                  <p className={styles.message}>
                    Learning Design er afvist. Learner-udførelse er ikke godkendt.
                  </p>
                ) : null}

                {learningDesign.state === "APPROVED" ? (
                  <ApprovedCreatorRetrievalExperience
                    learningDesign={learningDesign}
                    supportingSourceContext={result.supportingSourceContext}
                  />
                ) : null}
              </section>
            ) : null}

            {learningDesign?.state !== "APPROVED" ? (
              <>
                <h3>Understøttende kildekontekst</h3>
                <blockquote className={styles.source}>
                  {result.supportingSourceContext}
                </blockquote>
                <p className={styles.offsets}>
                  Kildegrænse: {result.proposal.supportingSourceBoundary.startOffset} – {result.proposal.supportingSourceBoundary.endOffset}
                </p>
              </>
            ) : null}
          </section>
        ) : null}
      </section>
    </main>
  );
}

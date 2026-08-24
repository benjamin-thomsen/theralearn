"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { createAuthorityIdentity, formResponseEvaluationContract, reviewResponseEvaluationContract } from "@/lib/learning-science/responseEvaluationContract";
import { formLaterRetrievalPrerequisite, relevantContextIdentity, reviewLaterRetrievalPrerequisite } from "@/lib/learning-science/laterRetrievalPrerequisite";
import type { LaterRetrievalPrerequisiteDraft, LearningDesign, ResponseEvaluationContract } from "@/lib/learning-science/types";
import type { AcceptedObjectiveWithRelevantContext } from "@/lib/subject-matter-intake/relevantContext";
import {
  analyzeCreatorObjective,
  approveCreatorObjectiveAndDeriveLearningDesign,
  determineCreatorLearningDesignApplicability,
  persistApprovedAuthorityPackage,
  reassessCreatorObjectiveChange,
  rejectCreatorObjective,
  rederiveCreatorLearningDesign,
} from "./actions";
import { getCurrentCreatorAuthorityReference } from "./creatorAuthority";
import {
  changeDurableRetentionPremise,
  changeRelevantContextDescription,
  type ActiveRetrievalNonApplicableOutcome,
} from "./learningDesignChange";
import { rejectLearningDesignReview } from "./learningDesignReview";
import styles from "./page.module.css";

type ObjectiveAnalysisResult = Awaited<ReturnType<typeof analyzeCreatorObjective>>;
type ReviewableObjective = Awaited<ReturnType<typeof reassessCreatorObjectiveChange>>;
type RejectedObjective = Awaited<ReturnType<typeof rejectCreatorObjective>>;

export default function CreatorObjectiveClient() {
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
  const [nonApplicableOutcome, setNonApplicableOutcome] = useState<ActiveRetrievalNonApplicableOutcome | null>(null);
  const [contractDraft, setContractDraft] = useState<ResponseEvaluationContract | null>(null);
  const [contractClaim, setContractClaim] = useState("");
  const [acceptedFormulations, setAcceptedFormulations] = useState("");
  const [contradictingFormulations, setContradictingFormulations] = useState("");
  const [contractFeedback, setContractFeedback] = useState("");
  const [contractReviewed, setContractReviewed] = useState(false);
  const [laterRetrievalPrerequisite, setLaterRetrievalPrerequisite] = useState<LaterRetrievalPrerequisiteDraft | null>(null);
  const [earliestEligibilityDelay, setEarliestEligibilityDelay] = useState("");
  const [earliestEligibilityUnit, setEarliestEligibilityUnit] = useState<"HOURS" | "DAYS">("DAYS");
  const [laterRetrievalPrerequisiteReviewed, setLaterRetrievalPrerequisiteReviewed] = useState(false);
  const [persistedPackageIdentity, setPersistedPackageIdentity] = useState<string | null>(null);

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
      setNonApplicableOutcome(null);
      resetContractFormation();
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

  async function handleApproveLearningDesign() {
    setError("");
    if (learningDesign?.state !== "PROPOSED" || !contractDraft ||
      !laterRetrievalPrerequisite || !result) return;
    setIsLoading(true);
    try {
      if (!contractReviewed || !laterRetrievalPrerequisiteReviewed) {
        throw new Error("Both authority drafts require explicit Creator review before approval.");
      }
      const persisted = await persistApprovedAuthorityPackage({
        proposedLearningDesign: learningDesign,
        reviewedResponseEvaluationContractDraft: {
          ...reviewResponseEvaluationContract(learningDesign, contractDraft, true),
          supportingSourceContext: result.supportingSourceContext,
        },
        reviewedLaterRetrievalPrerequisiteDraft: reviewLaterRetrievalPrerequisite(
          learningDesign,
          laterRetrievalPrerequisite,
          true,
        ),
      });
      setPersistedPackageIdentity(persisted.packageIdentity);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Learning Design approval failed.");
    } finally {
      setIsLoading(false);
    }
  }

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
  }

  async function handleFormLaterRetrievalPrerequisite() {
    if (learningDesign?.state !== "PROPOSED" || !contractDraft) return;
    setError("");
    try {
      const creatorAuthorityReference =
        await getCurrentCreatorAuthorityReference();
      setLaterRetrievalPrerequisite(formLaterRetrievalPrerequisite(learningDesign, {
        identity: crypto.randomUUID(),
        proposedLearningDesignIdentity: learningDesign.identity,
        learningObjectiveIdentity: learningDesign.learningObjectiveIdentity,
        relevantContextIdentity: relevantContextIdentity(learningDesign),
        supportingSourceBoundaryIdentity: contractDraft.supportingSource.identity,
        earliestEligibilityDelay: { value: Number(earliestEligibilityDelay), unit: earliestEligibilityUnit },
        creatorAuthorityReference,
      }));
      setLaterRetrievalPrerequisiteReviewed(false);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Later Retrieval Prerequisite formation failed.");
    }
  }

  function handleFormContract() {
    if (learningDesign?.state !== "PROPOSED" || !result) return;
    setError("");
    try {
      const boundary = result.proposal.supportingSourceBoundary;
      setContractDraft(formResponseEvaluationContract(learningDesign, {
        identity: crypto.randomUUID(),
        learningObjectiveIdentity: learningDesign.learningObjectiveIdentity,
        supportingSource: {
          identity: createAuthorityIdentity("source", { context: result.supportingSourceContext, boundary }),
          boundary,
        },
        correctionRequirementReference: learningDesign.feedbackResultRequirement.description,
        requiredResponseElements: [{
          identity: crypto.randomUUID(),
          claim: contractClaim,
          acceptedFormulations: acceptedFormulations.split("\n"),
          contradictingFormulations: contradictingFormulations ? contradictingFormulations.split("\n") : [],
          informativeFeedback: contractFeedback,
        }],
      }, result.supportingSourceContext));
      setContractReviewed(false);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Contract formation failed.");
    }
  }

  function handleRejectLearningDesign() {
    if (learningDesign?.state !== "PROPOSED") return;
    const rejected = rejectLearningDesignReview(
      learningDesign,
      laterRetrievalPrerequisite,
    );
    setLearningDesign(rejected.learningDesign);
    setLaterRetrievalPrerequisite(rejected.laterRetrievalPrerequisite);
    resetContractFormation();
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
    resetContractFormation();
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
      resetContractFormation();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Learning Design re-derivation failed.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleDurableRetentionPremiseChange() {
    if (!acceptedHandoff || !learningDesign || learningDesign.state === "INVALIDATED") return;

    const changed = changeDurableRetentionPremise(acceptedHandoff, learningDesign);
    setDurableRetentionIntended(changed.changedDurableRetentionPremise);
    setLearningDesign(changed.invalidatedDesign);
    resetContractFormation();
  }

  async function handleDetermineApplicability() {
    if (!acceptedHandoff || learningDesign?.state !== "INVALIDATED") return;

    setError("");
    setIsLoading(true);

    try {
      const result = await determineCreatorLearningDesignApplicability(acceptedHandoff);
      setAcceptedHandoff(result.acceptedHandoff);
      setLearningDesign(null);
      setNonApplicableOutcome(result.outcome);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Learning Design applicability failed.");
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

            {persistedPackageIdentity ? (
              <section className={styles.result}>
                <p className={styles.state}>GEMT</p>
                <h2>Det godkendte Learning Design er gemt</h2>
                <p className={styles.message}>
                  Den godkendte pakke er gemt uforanderligt. Learner-konteksten henter og validerer pakken på en ny serverforespørgsel.
                </p>
                <p><strong>Pakkeidentitet:</strong> {persistedPackageIdentity}</p>
                <Link href="/learner-handoff">Åbn Learner-kontekst</Link>
              </section>
            ) : learningDesign ? (
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

                {learningDesign.state === "PROPOSED" ? (
                  <section className={styles.result} aria-labelledby="response-contract-heading">
                    <h3 id="response-contract-heading">Response Evaluation Contract</h3>
                    {!contractDraft ? (
                      <>
                        <p>Creator/Content Owner authors every subject-matter-bearing field. Enter one formulation per line.</p>
                        <label className={styles.field}><span>Source-grounded required claim</span><textarea value={contractClaim} onChange={(event) => { setContractClaim(event.target.value); setContractReviewed(false); }} /></label>
                        <label className={styles.field}><span>Accepted formulations</span><textarea value={acceptedFormulations} onChange={(event) => { setAcceptedFormulations(event.target.value); setContractReviewed(false); }} /></label>
                        <label className={styles.field}><span>Contradicting formulations (optional)</span><textarea value={contradictingFormulations} onChange={(event) => { setContradictingFormulations(event.target.value); setContractReviewed(false); }} /></label>
                        <label className={styles.field}><span>Informative source-grounded feedback</span><textarea value={contractFeedback} onChange={(event) => { setContractFeedback(event.target.value); setContractReviewed(false); }} /></label>
                        <button className={styles.button} type="button" onClick={handleFormContract}>Form contract draft</button>
                      </>
                    ) : (
                      <>
                        <p><strong>Contract identity:</strong> {contractDraft.identity}</p>
                        <p><strong>Proposed Learning Design identity:</strong> {contractDraft.proposedLearningDesignIdentity}</p>
                        <p><strong>Learning Objective identity:</strong> {contractDraft.learningObjectiveIdentity}</p>
                        <p><strong>Learning Objective:</strong> {learningDesign.learningObjective.statement}</p>
                        <p><strong>Source identity:</strong> {contractDraft.supportingSource.identity}</p>
                        <p><strong>Immutable source boundary:</strong> {contractDraft.supportingSource.boundary.startOffset}–{contractDraft.supportingSource.boundary.endOffset}</p>
                        <blockquote className={styles.source}>{result.supportingSourceContext}</blockquote>
                        <p><strong>Correction requirement:</strong> {contractDraft.correctionRequirementReference}</p>
                        <p><strong>Mechanism:</strong> {contractDraft.mechanism}</p>
                        {contractDraft.requiredResponseElements.map((element, index) => <div key={element.identity}><h4>Required element {index + 1}</h4><p>{element.claim}</p><p><strong>Accepted:</strong> {element.acceptedFormulations.join("; ")}</p><p><strong>Contradicting:</strong> {element.contradictingFormulations.join("; ") || "None"}</p><p><strong>Feedback:</strong> {element.informativeFeedback}</p></div>)}
                        <label><input type="checkbox" checked={contractReviewed} onChange={(event) => setContractReviewed(event.target.checked)} /> I confirm this complete contract is source-grounded and suitable for this Learning Design</label>
                        <button className={styles.button} type="button" onClick={resetContractFormation}>Change contract</button>
                      </>
                    )}
                  </section>
                ) : null}

                {learningDesign.state === "PROPOSED" && contractDraft ? (
                  <section className={styles.result} aria-labelledby="later-retrieval-prerequisite-heading">
                    <h3 id="later-retrieval-prerequisite-heading">Later Retrieval Prerequisite</h3>
                    {!laterRetrievalPrerequisite ? (
                      <>
                        <p>Learning Science has authoritatively determined that repeated opportunities are required under {learningDesign.distributedPracticeApplicability.principleReference}. Author and review one relative earliest-eligibility boundary; this does not schedule an opportunity.</p>
                        <label className={styles.field}><span>Positive whole-number delay</span><input type="number" min="1" step="1" value={earliestEligibilityDelay} onChange={(event) => { setEarliestEligibilityDelay(event.target.value); setLaterRetrievalPrerequisiteReviewed(false); }} /></label>
                        <label className={styles.field}><span>Delay unit</span><select value={earliestEligibilityUnit} onChange={(event) => { setEarliestEligibilityUnit(event.target.value as "HOURS" | "DAYS"); setLaterRetrievalPrerequisiteReviewed(false); }}><option value="HOURS">Hours</option><option value="DAYS">Days</option></select></label>
                        <button className={styles.button} type="button" onClick={handleFormLaterRetrievalPrerequisite}>Form prerequisite draft</button>
                      </>
                    ) : (
                      <>
                        <p><strong>Distributed Practice applicability:</strong> {laterRetrievalPrerequisite.repeatedLearningOpportunitiesRequired ? "Repeated learning opportunities required" : "Not applicable"}</p>
                        <p><strong>Earliest-eligibility delay:</strong> {laterRetrievalPrerequisite.earliestEligibilityDelay.value} {laterRetrievalPrerequisite.earliestEligibilityDelay.unit}</p>
                        <p><strong>Proposed Learning Design identity:</strong> {laterRetrievalPrerequisite.proposedLearningDesignIdentity}</p>
                        <p><strong>Creator authority:</strong> {laterRetrievalPrerequisite.creatorAuthorityReference}</p>
                        <label><input type="checkbox" checked={laterRetrievalPrerequisiteReviewed} onChange={(event) => setLaterRetrievalPrerequisiteReviewed(event.target.checked)} /> I confirm this complete prerequisite and timing boundary with this Learning Design</label>
                        <button className={styles.button} type="button" onClick={() => { setLaterRetrievalPrerequisite(null); setLaterRetrievalPrerequisiteReviewed(false); }}>Change prerequisite</button>
                      </>
                    )}
                  </section>
                ) : null}

                <label className={styles.field}>
                  <span>Ændr Relevant Context-beskrivelse</span>
                  <input
                    value={contextDescription}
                    onChange={(event) => handleContextDescriptionChange(event.target.value)}
                    disabled={isLoading || hasRederivedLearningDesign || !durableRetentionIntended}
                  />
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={durableRetentionIntended}
                    onChange={handleDurableRetentionPremiseChange}
                    disabled={isLoading || !durableRetentionIntended}
                  />{" "}
                  Varig fastholdelse af tidligere tilegnet viden er tilsigtet
                </label>

                {learningDesign.state === "PROPOSED" ? (
                  <>
                    <button
                      className={styles.button}
                      type="button"
                      onClick={handleApproveLearningDesign}
                      disabled={!contractDraft || !contractReviewed || !laterRetrievalPrerequisite || !laterRetrievalPrerequisiteReviewed}
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
                    {durableRetentionIntended ? (
                      <button
                        className={styles.button}
                        type="button"
                        onClick={handleRederiveLearningDesign}
                        disabled={isLoading || !contextDescription.trim()}
                      >
                        {isLoading ? "Genafleder Learning Design..." : "Genafled Learning Design"}
                      </button>
                    ) : null}
                    {!durableRetentionIntended ? (
                      <button
                        className={styles.button}
                        type="button"
                        onClick={handleDetermineApplicability}
                        disabled={isLoading}
                      >
                        {isLoading ? "Vurderer anvendelighed..." : "Vurder anvendelighed"}
                      </button>
                    ) : null}
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

              </section>
            ) : null}


            {nonApplicableOutcome ? (
              <section className={styles.result}>
                <p className={styles.state}>IKKE ANVENDELIG</p>
                <h2>Active Retrieval er ikke anvendelig</h2>
                <p className={styles.message}>{nonApplicableOutcome.message}</p>
                <p>Der er ikke oprettet et erstatningsdesign. Forløbet stopper her.</p>
              </section>
            ) : null}

            {!persistedPackageIdentity && learningDesign?.state !== "APPROVED" ? (
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

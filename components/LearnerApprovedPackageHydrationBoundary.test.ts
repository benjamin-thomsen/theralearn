import { describe, expect, it } from "vitest";

import { deriveLearningDesign } from "../lib/learning-science/deriveLearningDesign";
import { approveLearningDesign } from "../lib/learning-science/learningDesignLifecycle";
import { formLaterRetrievalPrerequisite, relevantContextIdentity, reviewLaterRetrievalPrerequisite } from "../lib/learning-science/laterRetrievalPrerequisite";
import { createAuthorityIdentity, formResponseEvaluationContract, reviewResponseEvaluationContract } from "../lib/learning-science/responseEvaluationContract";
import { hydrateApprovedAuthorityPackage } from "./LearnerApprovedPackageHydrationBoundary";

const supportingSourceContext = "Mentalization concerns understanding mental states in oneself and others.";

function serializedPackage() {
  const design = deriveLearningDesign({ learningObjective: { statement: "Explain mentalization." }, relevantContext: { description: "Durable retention is intended.", durableRetentionOfPreviouslyAcquiredKnowledgeIntended: true } });
  const boundary = { startOffset: 0, endOffset: supportingSourceContext.length };
  const contract = formResponseEvaluationContract(design, {
    identity: "contract-1", learningObjectiveIdentity: design.learningObjectiveIdentity,
    supportingSource: { identity: createAuthorityIdentity("source", { context: supportingSourceContext, boundary }), boundary },
    correctionRequirementReference: design.feedbackResultRequirement.description,
    requiredResponseElements: [{ identity: "element-1", claim: "Mental states concern oneself and others.", acceptedFormulations: ["oneself and others"], contradictingFormulations: ["only behavior"], informativeFeedback: "Include oneself and others." }],
  }, supportingSourceContext);
  const prerequisite = formLaterRetrievalPrerequisite(design, {
    identity: "later-1", proposedLearningDesignIdentity: design.identity, learningObjectiveIdentity: design.learningObjectiveIdentity,
    relevantContextIdentity: relevantContextIdentity(design), supportingSourceBoundaryIdentity: contract.supportingSource.identity,
    earliestEligibilityDelay: { value: 2, unit: "DAYS" }, creatorAuthorityReference: "creator-1",
  });
  const approved = approveLearningDesign(design, reviewResponseEvaluationContract(design, contract, true), reviewLaterRetrievalPrerequisite(design, prerequisite, true));
  return JSON.stringify({ learningDesign: approved, supportingSourceContext });
}

function expectDeeplyFrozen(value: unknown): void {
  if (!value || typeof value !== "object") return;
  expect(Object.isFrozen(value)).toBe(true);
  Object.values(value).forEach(expectDeeplyFrozen);
}

describe("Learner approved-package client hydration boundary", () => {
  it("accepts JSON-shaped server input, deeply freezes it, and restores execution authority", () => {
    const hydrated = hydrateApprovedAuthorityPackage(serializedPackage());
    expect(hydrated.learningDesign.state).toBe("APPROVED");
    expect(hydrated.supportingSourceContext).toBe(supportingSourceContext);
    expectDeeplyFrozen(hydrated);
  });

  it("fails closed for tampering and unknown nested fields", () => {
    const snapshotTamper = JSON.parse(serializedPackage());
    snapshotTamper.learningDesign.responseEvaluationContract.requiredResponseElements[0].claim = "Tampered claim";
    expect(() => hydrateApprovedAuthorityPackage(JSON.stringify(snapshotTamper))).toThrow("valid approved authority package");

    const schemaTamper = JSON.parse(serializedPackage());
    schemaTamper.learningDesign.responseEvaluationContract.supportingSource.boundary.injected = true;
    expect(() => hydrateApprovedAuthorityPackage(JSON.stringify(schemaTamper))).toThrow("valid approved authority package");
  });
});

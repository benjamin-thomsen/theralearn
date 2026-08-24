import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { deriveLearningDesign } from "../lib/learning-science/deriveLearningDesign";
import { approveLearningDesign, rejectLearningDesign } from "../lib/learning-science/learningDesignLifecycle";
import { createAuthorityIdentity, formResponseEvaluationContract, reviewResponseEvaluationContract } from "../lib/learning-science/responseEvaluationContract";
import ApprovedCreatorRetrievalExperience, { createSourceGroundedRetrievalResult } from "./ApprovedCreatorRetrievalExperience";

function createProposedDesign() {
  return deriveLearningDesign({
    learningObjective: { statement: "Explain mentalization." },
    relevantContext: {
      description: "Durable retention is intended.",
      durableRetentionOfPreviouslyAcquiredKnowledgeIntended: true,
    },
  });
}

function createApprovedPairForTest() {
  const design = createProposedDesign();
  const boundary = { startOffset: 0, endOffset: 10 };
  const contract = formResponseEvaluationContract(design, {
    identity: "contract-1", learningObjectiveIdentity: design.learningObjectiveIdentity,
    supportingSource: { identity: createAuthorityIdentity("source", { context: "Source context", boundary }), boundary },
    correctionRequirementReference: design.feedbackResultRequirement.description,
    requiredResponseElements: [{ identity: "element-1", claim: "Creator claim", acceptedFormulations: ["accepted"], contradictingFormulations: [], informativeFeedback: "Creator feedback" }],
  }, "Source context");
  return approveLearningDesign(design, reviewResponseEvaluationContract(design, contract, true));
}

describe("approved Creator retrieval experience", () => {
  it("returns source-grounded feedback only after an active response", () => {
    const approvedDesign = createApprovedPairForTest();

    expect(
      createSourceGroundedRetrievalResult(
        approvedDesign,
        "Mentalization is understanding mental states.",
        "Mentalization concerns understanding mental states in oneself and others.",
      ),
    ).toEqual({
      learnerResponse: "Mentalization is understanding mental states.",
      supportingSourceContext:
        "Mentalization concerns understanding mental states in oneself and others.",
    });
  });

  it("prevents a proposed or rejected design from entering execution", () => {
    const proposedDesign = createProposedDesign();
    const rejectedDesign = rejectLearningDesign(proposedDesign);

    expect(() =>
      createSourceGroundedRetrievalResult(
        proposedDesign,
        "An active response.",
        "Source-grounded feedback.",
      ),
    ).toThrow("Learner execution requires an APPROVED learning design.");
    expect(() =>
      createSourceGroundedRetrievalResult(
        rejectedDesign,
        "An active response.",
        "Source-grounded feedback.",
      ),
    ).toThrow("Learner execution requires an APPROVED learning design.");
  });

  it("does not expose the learner retrieval activity for a rejected design", () => {
    const rejectedDesign = rejectLearningDesign(createProposedDesign());

    expect(() =>
      renderToStaticMarkup(
        createElement(ApprovedCreatorRetrievalExperience, {
          learningDesign: rejectedDesign,
          supportingSourceContext: "Source-grounded feedback.",
        }),
      ),
    ).toThrow("Learner execution requires an APPROVED learning design.");
  });

  it("requires both an active response and supporting source context", () => {
    const approvedDesign = createApprovedPairForTest();

    expect(() =>
      createSourceGroundedRetrievalResult(
        approvedDesign,
        "   ",
        "Source-grounded feedback.",
      ),
    ).toThrow("The learner must provide an active response before reveal.");
    expect(() =>
      createSourceGroundedRetrievalResult(
        approvedDesign,
        "An active response.",
        "   ",
      ),
    ).toThrow("Source-grounded feedback requires supporting source context.");
  });
});

import { describe, expect, it } from "vitest";

import { deriveLearningDesign } from "../lib/learning-science/deriveLearningDesign";
import {
  createAuthorityIdentity,
  formResponseEvaluationContract,
} from "../lib/learning-science/responseEvaluationContract";
import {
  formLaterRetrievalPrerequisite,
  relevantContextIdentity,
} from "../lib/learning-science/laterRetrievalPrerequisite";
import { approveReviewedBoundedLearningDesign } from "./BoundedLearningDesignSlice";

function createReviewPair() {
  const sourceContext = "Mentalization concerns understanding mental states.";
  const design = deriveLearningDesign({
    learningObjective: { statement: "Explain mentalization." },
    relevantContext: {
      description: sourceContext,
      durableRetentionOfPreviouslyAcquiredKnowledgeIntended: true,
    },
  });
  const boundary = { startOffset: 0, endOffset: sourceContext.length };
  const contract = formResponseEvaluationContract(
    design,
    {
      identity: "bounded-contract-1",
      learningObjectiveIdentity: design.learningObjectiveIdentity,
      supportingSource: {
        identity: createAuthorityIdentity("source", {
          context: sourceContext,
          boundary,
        }),
        boundary,
      },
      correctionRequirementReference:
        design.feedbackResultRequirement.description,
      requiredResponseElements: [
        {
          identity: "bounded-element-1",
          claim: "Mentalization concerns mental states.",
          acceptedFormulations: ["Understanding mental states"],
          contradictingFormulations: [],
          informativeFeedback: "The source concerns understanding mental states.",
        },
      ],
    },
    sourceContext,
  );
  const prerequisite = formLaterRetrievalPrerequisite(design, {
    identity: "bounded-prerequisite-1",
    proposedLearningDesignIdentity: design.identity,
    learningObjectiveIdentity: design.learningObjectiveIdentity,
    relevantContextIdentity: relevantContextIdentity(design),
    supportingSourceBoundaryIdentity: contract.supportingSource.identity,
    earliestEligibilityDelay: { value: 2, unit: "DAYS" },
    creatorAuthorityReference: "creator-1",
  });
  return { design, contract, prerequisite };
}

describe("bounded Learning Design approval binding", () => {
  it("fails closed without explicit review confirmation", () => {
    const { design, contract, prerequisite } = createReviewPair();

    expect(() =>
      approveReviewedBoundedLearningDesign(
        design,
        contract,
        false,
        prerequisite,
        true,
      ),
    ).toThrow("Creator review confirmation");
  });

  it("fails closed when the later-retrieval prerequisite is absent", () => {
    const { design, contract } = createReviewPair();

    expect(() =>
      approveReviewedBoundedLearningDesign(
        design,
        contract,
        true,
        null,
        false,
      ),
    ).toThrow("exact reviewed Later Retrieval Prerequisite");
  });

  it("preserves the approval path with the reviewed same-version prerequisite", () => {
    const { design, contract, prerequisite } = createReviewPair();

    const approved = approveReviewedBoundedLearningDesign(
      design,
      contract,
      true,
      prerequisite,
      true,
    );

    expect(approved.state).toBe("APPROVED");
    expect(approved.laterRetrievalPrerequisite).toMatchObject({
      proposedLearningDesignIdentity: design.identity,
      creatorAuthorityReference: "creator-1",
      earliestEligibilityDelay: { value: 2, unit: "DAYS" },
    });
  });
});

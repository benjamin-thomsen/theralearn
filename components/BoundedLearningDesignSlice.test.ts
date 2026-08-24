import { describe, expect, it } from "vitest";

import { deriveLearningDesign } from "../lib/learning-science/deriveLearningDesign";
import {
  createAuthorityIdentity,
  formResponseEvaluationContract,
} from "../lib/learning-science/responseEvaluationContract";
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
  return { design, contract };
}

describe("bounded Learning Design approval binding", () => {
  it("fails closed without explicit review confirmation", () => {
    const { design, contract } = createReviewPair();

    expect(() =>
      approveReviewedBoundedLearningDesign(design, contract, false),
    ).toThrow("Creator review confirmation");
  });

  it("atomically binds the exact reviewed contract to the approved design", () => {
    const { design, contract } = createReviewPair();

    const approved = approveReviewedBoundedLearningDesign(
      design,
      contract,
      true,
    );

    expect(approved.state).toBe("APPROVED");
    expect(approved.responseEvaluationContractIdentity).toBe(contract.identity);
    expect(approved.responseEvaluationContractSnapshot).toBe(
      JSON.stringify(contract),
    );
    expect(Object.isFrozen(approved.responseEvaluationContract)).toBe(true);
  });
});

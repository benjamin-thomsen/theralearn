import { describe, expect, it } from "vitest";

import { requireApprovedLearningDesign } from "../../lib/learning-science/learningDesignExecution";
import {
  approveLearningDesign,
  rejectLearningDesign,
} from "../../lib/learning-science/learningDesignLifecycle";
import { createAuthorityIdentity, formResponseEvaluationContract, reviewResponseEvaluationContract } from "../../lib/learning-science/responseEvaluationContract";
import { formLaterRetrievalPrerequisite, relevantContextIdentity, reviewLaterRetrievalPrerequisite } from "../../lib/learning-science/laterRetrievalPrerequisite";
import {
  approveObjectiveCandidate,
  changeObjectiveProposal,
  createObjectiveProposal,
  makeObjectiveCandidateReviewable,
} from "../../lib/subject-matter-intake/objectiveProposal";
import { formBoundedRelevantContext } from "../../lib/subject-matter-intake/relevantContext";
import { handoffToLearningScience } from "../../lib/subject-matter-intake/handoffToLearningScience";
import {
  changeDurableRetentionPremise,
  changeRelevantContextDescription,
  deriveOutcomeFromChangedDurableRetentionPremise,
  rederiveLearningDesignFromChangedDescription,
} from "./learningDesignChange";

function createAcceptedHandoff() {
  const proposal = createObjectiveProposal("Define mentalization.", {
    startOffset: 2,
    endOffset: 24,
  });
  const candidate = changeObjectiveProposal(proposal, "Explain mentalization.");
  const reviewable = makeObjectiveCandidateReviewable(candidate, {
    sourceGroundingReassessed: true,
  });
  const acceptedObjective = approveObjectiveCandidate(reviewable);

  return formBoundedRelevantContext(
    acceptedObjective,
    "Original bounded context.",
    true,
  );
}

function approve(design: ReturnType<typeof handoffToLearningScience>) {
  const boundary = { startOffset: 2, endOffset: 24 };
  const contract = formResponseEvaluationContract(design, {
    identity: crypto.randomUUID(), learningObjectiveIdentity: design.learningObjectiveIdentity,
    supportingSource: { identity: createAuthorityIdentity("source", { context: "Source context", boundary }), boundary },
    correctionRequirementReference: design.feedbackResultRequirement.description,
    requiredResponseElements: [{ identity: "element-1", claim: "Creator claim", acceptedFormulations: ["accepted"], contradictingFormulations: [], informativeFeedback: "Creator feedback" }],
  }, "Source context");
  const prerequisite = formLaterRetrievalPrerequisite(design, { identity: "later-1", proposedLearningDesignIdentity: design.identity, learningObjectiveIdentity: design.learningObjectiveIdentity, relevantContextIdentity: relevantContextIdentity(design), supportingSourceBoundaryIdentity: contract.supportingSource.identity, earliestEligibilityDelay: { value: 2, unit: "DAYS" }, creatorAuthorityReference: "creator-1" });
  return approveLearningDesign(design, reviewResponseEvaluationContract(design, contract, true), reviewLaterRetrievalPrerequisite(design, prerequisite, true));
}

describe("Creator Learning Design description change", () => {
  it.each(["PROPOSED", "APPROVED", "REJECTED"] as const)(
    "immediately invalidates a %s design without mutating its premises",
    (state) => {
      const acceptedHandoff = createAcceptedHandoff();
      const proposed = handoffToLearningScience(acceptedHandoff);
      const design =
        state === "APPROVED"
          ? approve(proposed)
          : state === "REJECTED"
            ? rejectLearningDesign(proposed)
            : proposed;

      const changed = changeRelevantContextDescription(
        acceptedHandoff,
        design,
        "Changed bounded context.",
      );

      expect(changed.invalidatedDesign.state).toBe("INVALIDATED");
      expect(changed.invalidatedDesign.relevantContext.description).toBe(
        "Original bounded context.",
      );
      expect(changed.changedDescription).toBe("Changed bounded context.");
      expect(() => requireApprovedLearningDesign(changed.invalidatedDesign)).toThrow(
        "Learner execution requires an APPROVED learning design.",
      );
    },
  );

  it("rejects an empty changed description", () => {
    expect(() =>
      rederiveLearningDesignFromChangedDescription(createAcceptedHandoff(), "   "),
    ).toThrow("Bounded Relevant Context requires an explicit description.");
  });

  it("preserves accepted authority and creates a distinct fresh proposal", () => {
    const acceptedHandoff = createAcceptedHandoff();
    const priorDesign = approve(
      handoffToLearningScience(acceptedHandoff),
    );
    const changed = changeRelevantContextDescription(
      acceptedHandoff,
      priorDesign,
      "Changed bounded context.",
    );
    const rederived = rederiveLearningDesignFromChangedDescription(
      changed.acceptedHandoff,
      changed.changedDescription,
    );

    expect(rederived.learningDesign).not.toBe(priorDesign);
    expect(rederived.learningDesign.state).toBe("PROPOSED");
    expect(rederived.learningDesign.relevantContext.description).toBe(
      "Changed bounded context.",
    );
    expect(rederived.acceptedHandoff.acceptedLearningObjective).toBe(
      acceptedHandoff.acceptedLearningObjective,
    );
    expect(
      rederived.acceptedHandoff.acceptedLearningObjective.supportingSourceBoundary,
    ).toBe(acceptedHandoff.acceptedLearningObjective.supportingSourceBoundary);
    expect(
      rederived.acceptedHandoff.relevantContext
        .durableRetentionOfPreviouslyAcquiredKnowledgeIntended,
    ).toBe(true);
    expect(() => requireApprovedLearningDesign(rederived.learningDesign)).toThrow(
      "Learner execution requires an APPROVED learning design.",
    );
  });

  it("allows explicit approval or rejection of the fresh proposal before execution", () => {
    const acceptedHandoff = createAcceptedHandoff();
    const rederived = rederiveLearningDesignFromChangedDescription(
      acceptedHandoff,
      "Changed bounded context.",
    );

    const approved = approve(rederived.learningDesign);
    const rejected = rejectLearningDesign(rederived.learningDesign);

    expect(requireApprovedLearningDesign(approved)).toBe(approved);
    expect(() => requireApprovedLearningDesign(rejected)).toThrow(
      "Learner execution requires an APPROVED learning design.",
    );
  });
});

describe("Creator durable-retention premise change", () => {
  it.each(["PROPOSED", "APPROVED", "REJECTED"] as const)(
    "invalidates a %s design and reaches only the explicit non-applicable outcome",
    (state) => {
      const acceptedHandoff = createAcceptedHandoff();
      const proposed = handoffToLearningScience(acceptedHandoff);
      const design =
        state === "APPROVED"
          ? approve(proposed)
          : state === "REJECTED"
            ? rejectLearningDesign(proposed)
            : proposed;

      const changed = changeDurableRetentionPremise(
        acceptedHandoff,
        design,
      );

      expect(changed.changedDurableRetentionPremise).toBe(false);
      expect(changed.invalidatedDesign.state).toBe("INVALIDATED");
      expect(changed.invalidatedDesign).not.toBe(design);
      expect(changed.invalidatedDesign.learningObjective).toBe(
        design.learningObjective,
      );
      expect(() => requireApprovedLearningDesign(changed.invalidatedDesign)).toThrow(
        "Learner execution requires an APPROVED learning design.",
      );

      const result = deriveOutcomeFromChangedDurableRetentionPremise(
        changed.acceptedHandoff,
      );

      expect(result.acceptedHandoff.acceptedLearningObjective).toBe(
        acceptedHandoff.acceptedLearningObjective,
      );
      expect(
        result.acceptedHandoff.acceptedLearningObjective.supportingSourceBoundary,
      ).toBe(acceptedHandoff.acceptedLearningObjective.supportingSourceBoundary);
      expect(result.acceptedHandoff.relevantContext).toEqual({
        description: "Original bounded context.",
        durableRetentionOfPreviouslyAcquiredKnowledgeIntended: false,
      });
      expect(result.outcome).toEqual({
        kind: "ACTIVE_RETRIEVAL_NON_APPLICABLE",
        message:
          "Active Retrieval is not applicable unless durable retention of previously acquired knowledge is an intended learning outcome.",
      });
      expect(result.outcome).not.toHaveProperty("learningDesign");
      expect(result.outcome).not.toHaveProperty("mechanism");
      expect(result.outcome).not.toHaveProperty("state");
    },
  );

  it("rejects any premise transition that does not begin at true", () => {
    const acceptedHandoff = createAcceptedHandoff();
    const falseHandoff = formBoundedRelevantContext(
      acceptedHandoff.acceptedLearningObjective,
      acceptedHandoff.relevantContext.description,
      false,
    );
    const design = handoffToLearningScience(acceptedHandoff);

    expect(() => changeDurableRetentionPremise(falseHandoff, design)).toThrow(
      "Durable-retention premise change requires an accepted true premise.",
    );
  });

  it("does not convert unrelated handoff failures into non-applicability", () => {
    const acceptedHandoff = createAcceptedHandoff();
    const invalidHandoff = {
      ...acceptedHandoff,
      acceptedLearningObjective: {
        ...acceptedHandoff.acceptedLearningObjective,
        statement: "   ",
      },
    };

    expect(() =>
      deriveOutcomeFromChangedDurableRetentionPremise(invalidHandoff),
    ).toThrow(
      "Active Retrieval applicability requires an explicit Learning Objective.",
    );
  });
});

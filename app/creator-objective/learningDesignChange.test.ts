import { describe, expect, it } from "vitest";

import { requireApprovedLearningDesign } from "../../lib/learning-science/learningDesignExecution";
import {
  approveLearningDesign,
  rejectLearningDesign,
} from "../../lib/learning-science/learningDesignLifecycle";
import {
  approveObjectiveCandidate,
  changeObjectiveProposal,
  createObjectiveProposal,
  makeObjectiveCandidateReviewable,
} from "../../lib/subject-matter-intake/objectiveProposal";
import { formBoundedRelevantContext } from "../../lib/subject-matter-intake/relevantContext";
import { handoffToLearningScience } from "../../lib/subject-matter-intake/handoffToLearningScience";
import {
  changeRelevantContextDescription,
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

describe("Creator Learning Design description change", () => {
  it.each(["PROPOSED", "APPROVED", "REJECTED"] as const)(
    "immediately invalidates a %s design without mutating its premises",
    (state) => {
      const acceptedHandoff = createAcceptedHandoff();
      const proposed = handoffToLearningScience(acceptedHandoff);
      const design =
        state === "APPROVED"
          ? approveLearningDesign(proposed)
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
    const priorDesign = approveLearningDesign(
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

    const approved = approveLearningDesign(rederived.learningDesign);
    const rejected = rejectLearningDesign(rederived.learningDesign);

    expect(requireApprovedLearningDesign(approved)).toBe(approved);
    expect(() => requireApprovedLearningDesign(rejected)).toThrow(
      "Learner execution requires an APPROVED learning design.",
    );
  });
});

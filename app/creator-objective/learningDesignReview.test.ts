import { describe, expect, it } from "vitest";

import { deriveLearningDesign } from "../../lib/learning-science/deriveLearningDesign";
import { formLaterRetrievalPrerequisite, relevantContextIdentity } from "../../lib/learning-science/laterRetrievalPrerequisite";
import { rejectLearningDesignReview } from "./learningDesignReview";

describe("Creator Learning Design review session", () => {
  it("discards the in-session Later Retrieval Prerequisite draft on rejection", () => {
    const design = deriveLearningDesign({
      learningObjective: { statement: "Explain mentalization." },
      relevantContext: {
        description: "Bounded context.",
        durableRetentionOfPreviouslyAcquiredKnowledgeIntended: true,
      },
    });
    const draft = formLaterRetrievalPrerequisite(design, {
      identity: "later-1",
      proposedLearningDesignIdentity: design.identity,
      learningObjectiveIdentity: design.learningObjectiveIdentity,
      relevantContextIdentity: relevantContextIdentity(design),
      supportingSourceBoundaryIdentity: "source-1",
      earliestEligibilityDelay: { value: 2, unit: "DAYS" },
      creatorAuthorityReference: "creator-1",
    });

    const rejected = rejectLearningDesignReview(design, draft);

    expect(rejected.learningDesign.state).toBe("REJECTED");
    expect(rejected.laterRetrievalPrerequisite).toBeNull();
  });
});

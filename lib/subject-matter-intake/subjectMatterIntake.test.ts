import { describe, expect, it } from "vitest";

import { extractSourceMaterial } from "./extractSourceMaterial";
import { validateObjectiveAnalysisCandidate } from "./objectiveAnalysis";
import { changeObjectiveProposal, createObjectiveProposal, makeObjectiveCandidateReviewable, rejectObjectiveCandidate, approveObjectiveCandidate } from "./objectiveProposal";
import { createBoundedPlainTextSourceDocument } from "./types";
import { formBoundedRelevantContext } from "./relevantContext";
import { handoffToLearningScience } from "./handoffToLearningScience";

describe("Subject-Matter Intake", () => {
  it("rejects empty plain-text source input", () => {
    expect(() => createBoundedPlainTextSourceDocument("   ")).toThrow(
      "Bounded plain-text source input requires non-empty text.",
    );
  });

  it("normalizes surrounding whitespace at the source-input boundary", () => {
    const sourceDocument = createBoundedPlainTextSourceDocument(
      "  Explicit subject matter.  ",
    );

    expect(sourceDocument).toEqual({
      kind: "plain-text",
      text: "Explicit subject matter.",
    });
  });

  it("extracts source material without changing the validated text", () => {
    const sourceDocument = createBoundedPlainTextSourceDocument(
      "The learner must be able to define mentalization.",
    );

    const extractedSourceMaterial = extractSourceMaterial(sourceDocument);

    expect(extractedSourceMaterial.text).toBe(sourceDocument.text);
    expect(extractedSourceMaterial.sourceDocument).toBe(sourceDocument);
  });

  it("preserves a deterministic full-source boundary for traceability", () => {
    const sourceDocument = createBoundedPlainTextSourceDocument(
      "Traceable subject matter.",
    );

    const extractedSourceMaterial = extractSourceMaterial(sourceDocument);

    expect(extractedSourceMaterial.fullSourceBoundary).toEqual({
      startOffset: 0,
      endOffset: sourceDocument.text.length,
    });
  });

  it("represents an objective as a proposal with supporting source traceability", () => {
    const sourceDocument = createBoundedPlainTextSourceDocument(
      "The learner must be able to define mentalization.",
    );
    const extractedSourceMaterial = extractSourceMaterial(sourceDocument);

    const proposal = createObjectiveProposal(
      "Define mentalization.",
      extractedSourceMaterial.fullSourceBoundary,
    );

    expect(proposal).toEqual({
      state: "PROPOSED",
      statement: "Define mentalization.",
      supportingSourceBoundary: extractedSourceMaterial.fullSourceBoundary,
    });
  });

  it("validates a grounded objective-analysis candidate into a proposed objective", () => {
    const sourceDocument = createBoundedPlainTextSourceDocument(
      "The learner must be able to define mentalization.",
    );
    const extractedSourceMaterial = extractSourceMaterial(sourceDocument);

    const proposal = validateObjectiveAnalysisCandidate(
      {
        statement: "Define mentalization.",
        supportingSourceBoundary: extractedSourceMaterial.fullSourceBoundary,
      },
      extractedSourceMaterial,
    );

    expect(proposal).toEqual({
      state: "PROPOSED",
      statement: "Define mentalization.",
      supportingSourceBoundary: extractedSourceMaterial.fullSourceBoundary,
    });
  });

  it("rejects an objective-analysis candidate with an empty statement", () => {
    const sourceDocument = createBoundedPlainTextSourceDocument(
      "Grounded source material.",
    );
    const extractedSourceMaterial = extractSourceMaterial(sourceDocument);

    expect(() =>
      validateObjectiveAnalysisCandidate(
        {
          statement: "   ",
          supportingSourceBoundary: extractedSourceMaterial.fullSourceBoundary,
        },
        extractedSourceMaterial,
      ),
    ).toThrow("Objective analysis requires a non-empty statement.");
  });

  it("rejects an objective-analysis candidate with invalid supporting source grounding", () => {
    const sourceDocument = createBoundedPlainTextSourceDocument(
      "Grounded source material.",
    );
    const extractedSourceMaterial = extractSourceMaterial(sourceDocument);

    expect(() =>
      validateObjectiveAnalysisCandidate(
        {
          statement: "Describe the grounded source material.",
          supportingSourceBoundary: {
            startOffset: 0,
            endOffset: extractedSourceMaterial.text.length + 1,
          },
        },
        extractedSourceMaterial,
      ),
    ).toThrow(
      "Objective analysis requires valid supporting source grounding.",
    );
  });


  it("invalidates prior source grounding after Creator change", () => {
    const proposal = createObjectiveProposal("Define mentalization.", { startOffset: 0, endOffset: 10 });
    const candidate = changeObjectiveProposal(proposal, "Explain mentalization.");

    expect(candidate).toEqual({
      state: "CREATOR_CONTROLLED",
      statement: "Explain mentalization.",
      supportingSourceBoundary: proposal.supportingSourceBoundary,
      sourceGroundingState: "INVALIDATED",
    });
  });

  it("rejects an empty objective proposal statement", () => {
    expect(() =>
      createObjectiveProposal("   ", { startOffset: 0, endOffset: 1 }),
    ).toThrow("Objective proposal requires a non-empty statement.");
  });

  it("makes a changed objective reviewable only after source-grounding reassessment", () => {
    const proposal = createObjectiveProposal("Define mentalization.", { startOffset: 0, endOffset: 10 });
    const candidate = changeObjectiveProposal(proposal, "Explain mentalization.");
    const reviewable = makeObjectiveCandidateReviewable(candidate, { sourceGroundingReassessed: true });

    expect(reviewable).toEqual({
      state: "REVIEWABLE",
      statement: "Explain mentalization.",
      supportingSourceBoundary: proposal.supportingSourceBoundary,
      sourceGroundingState: "REASSESSED",
    });
  });

  it("rejects a reviewable objective with no downstream authority", () => {
    const proposal = createObjectiveProposal("Define mentalization.", { startOffset: 0, endOffset: 10 });
    const candidate = changeObjectiveProposal(proposal, "Explain mentalization.");
    const reviewable = makeObjectiveCandidateReviewable(candidate, { sourceGroundingReassessed: true });
    const rejected = rejectObjectiveCandidate(reviewable);

    expect(rejected).toEqual({
      state: "REJECTED",
      statement: "Explain mentalization.",
      supportingSourceBoundary: proposal.supportingSourceBoundary,
    });
  });

  it("establishes an AcceptedLearningObjective only through explicit Creator approval", () => {
    const proposal = createObjectiveProposal("Define mentalization.", { startOffset: 0, endOffset: 10 });
    const candidate = changeObjectiveProposal(proposal, "Explain mentalization.");
    const reviewable = makeObjectiveCandidateReviewable(candidate, { sourceGroundingReassessed: true });
    const accepted = approveObjectiveCandidate(reviewable);

    expect(accepted).toEqual({
      state: "ACCEPTED",
      statement: "Explain mentalization.",
      supportingSourceBoundary: proposal.supportingSourceBoundary,
    });
  });
  it("forms bounded Relevant Context around an AcceptedLearningObjective while preserving source traceability", () => {
    const proposal = createObjectiveProposal("Define mentalization.", { startOffset: 0, endOffset: 10 });
    const candidate = changeObjectiveProposal(proposal, "Explain mentalization.");
    const reviewable = makeObjectiveCandidateReviewable(candidate, { sourceGroundingReassessed: true });
    const accepted = approveObjectiveCandidate(reviewable);

    const formed = formBoundedRelevantContext(
      accepted,
      "Durable retention is intended for this bounded learning context.",
      true,
    );

    expect(formed).toEqual({
      acceptedLearningObjective: accepted,
      relevantContext: {
        description: "Durable retention is intended for this bounded learning context.",
        durableRetentionOfPreviouslyAcquiredKnowledgeIntended: true,
      },
    });
    expect(formed.acceptedLearningObjective.supportingSourceBoundary).toBe(
      accepted.supportingSourceBoundary,
    );
  });
  it("rejects empty bounded Relevant Context description", () => {
    const proposal = createObjectiveProposal("Define mentalization.", { startOffset: 0, endOffset: 10 });
    const candidate = changeObjectiveProposal(proposal, "Explain mentalization.");
    const reviewable = makeObjectiveCandidateReviewable(candidate, { sourceGroundingReassessed: true });
    const accepted = approveObjectiveCandidate(reviewable);

    expect(() =>
      formBoundedRelevantContext(accepted, "   ", false),
    ).toThrow("Bounded Relevant Context requires an explicit description.");
  });

  it("hands an accepted objective and bounded Relevant Context to the existing Learning Science Engine", () => {
    const proposal = createObjectiveProposal("Define mentalization.", { startOffset: 0, endOffset: 10 });
    const candidate = changeObjectiveProposal(proposal, "Explain mentalization.");
    const reviewable = makeObjectiveCandidateReviewable(candidate, { sourceGroundingReassessed: true });
    const accepted = approveObjectiveCandidate(reviewable);
    const acceptedHandoff = formBoundedRelevantContext(
      accepted,
      "Durable retention is intended for this bounded learning context.",
      true,
    );

    const design = handoffToLearningScience(acceptedHandoff);

    expect(design.state).toBe("PROPOSED");
    expect(design.learningObjective).toEqual({
      statement: accepted.statement,
    });
    expect(design.relevantContext).toBe(acceptedHandoff.relevantContext);
    expect(acceptedHandoff.acceptedLearningObjective.supportingSourceBoundary).toBe(
      accepted.supportingSourceBoundary,
    );
  });
});

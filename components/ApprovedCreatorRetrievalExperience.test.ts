import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { deriveLearningDesign } from "../lib/learning-science/deriveLearningDesign";
import { approveLearningDesign, invalidateLearningDesign, rejectLearningDesign } from "../lib/learning-science/learningDesignLifecycle";
import { evaluateCorrectionResponse, evaluateFirstResponse } from "../lib/learning-science/responseEvaluation";
import { createAuthorityIdentity, formResponseEvaluationContract, reviewResponseEvaluationContract } from "../lib/learning-science/responseEvaluationContract";
import type { RequiredResponseElement } from "../lib/learning-science/types";
import ApprovedCreatorRetrievalExperience, { createSourceGroundedRetrievalResult } from "./ApprovedCreatorRetrievalExperience";

const sourceContext = "Mentalization concerns understanding mental states in oneself and others.";

function createProposedDesign() {
  return deriveLearningDesign({ learningObjective: { statement: "Explain mentalization." }, relevantContext: { description: "Durable retention is intended.", durableRetentionOfPreviouslyAcquiredKnowledgeIntended: true } });
}

function createApprovedPairForTest(elements: readonly RequiredResponseElement[] = [
  { identity: "element-1", claim: "Mental states concern oneself.", acceptedFormulations: ["oneself"], contradictingFormulations: ["only observable behavior"], informativeFeedback: "Include mental states in oneself." },
  { identity: "element-2", claim: "Mental states concern others.", acceptedFormulations: ["others"], contradictingFormulations: ["never others"], informativeFeedback: "Include mental states in others." },
]) {
  const design = createProposedDesign();
  const boundary = { startOffset: 0, endOffset: sourceContext.length };
  const contract = formResponseEvaluationContract(design, {
    identity: "contract-1", learningObjectiveIdentity: design.learningObjectiveIdentity,
    supportingSource: { identity: createAuthorityIdentity("source", { context: sourceContext, boundary }), boundary },
    correctionRequirementReference: design.feedbackResultRequirement.description, requiredResponseElements: elements,
  }, sourceContext);
  return approveLearningDesign(design, reviewResponseEvaluationContract(design, contract, true));
}

describe("approved Creator retrieval experience", () => {
  it("requires approved execution authority and a response before any reveal", () => {
    const proposed = createProposedDesign();
    for (const design of [proposed, rejectLearningDesign(proposed), invalidateLearningDesign(proposed)]) {
      expect(() => createSourceGroundedRetrievalResult(design, "oneself and others", sourceContext)).toThrow("APPROVED learning design");
    }
    expect(() => evaluateFirstResponse(createApprovedPairForTest(), "   ", sourceContext)).toThrow("active response before reveal");
    expect(() => renderToStaticMarkup(createElement(ApprovedCreatorRetrievalExperience, { learningDesign: rejectLearningDesign(createProposedDesign()), supportingSourceContext: sourceContext }))).toThrow("APPROVED learning design");
    const markup = renderToStaticMarkup(createElement(ApprovedCreatorRetrievalExperience, { learningDesign: createApprovedPairForTest(), supportingSourceContext: sourceContext }));
    expect(markup).not.toContain("Feedback");
    expect(markup).not.toContain("Informativ feedback");
    expect(markup).not.toContain(sourceContext);
  });

  it("applies exact normalization and Unicode whole-token matching", () => {
    const design = createApprovedPairForTest([{ identity: "element", claim: "Claim", acceptedFormulations: ["MÉNTAL   STATE."], contradictingFormulations: [], informativeFeedback: "Feedback" }]);
    expect(evaluateFirstResponse(design, "A me\u0301ntal state!", sourceContext).status).toBe("NO_CORRECTION_REQUIRED");
    expect(evaluateFirstResponse(design, "preMÉNTAL STATEpost", sourceContext)).toMatchObject({ status: "CORRECTION_REQUIRED", targetState: "ABSENT" });
  });

  it("stops without correction when every ordered element is evidenced", () => {
    const result = evaluateFirstResponse(createApprovedPairForTest(), "Mental states in oneself and others.", sourceContext);
    expect(result).toMatchObject({ status: "NO_CORRECTION_REQUIRED", learnerResponse: "Mental states in oneself and others." });
    expect("target" in result).toBe(false);
  });

  it("selects only the first Creator-ordered target and preserves authority", () => {
    const design = createApprovedPairForTest();
    const result = evaluateFirstResponse(design, "It is only observable behavior.", sourceContext);
    expect(result).toMatchObject({ status: "CORRECTION_REQUIRED", targetState: "CONTRADICTED", target: { identity: "element-1", informativeFeedback: "Include mental states in oneself." } });
    if (result.status !== "CORRECTION_REQUIRED") throw new Error("Expected correction branch.");
    expect(result.approvedDesign).toBe(design);
    expect(result.target).toBe(design.responseEvaluationContract.requiredResponseElements[0]);
    expect(result.supportingSourceContext).toBe(sourceContext);
  });

  it("returns explicit terminal first-evaluation indeterminate and failure outcomes", () => {
    const design = createApprovedPairForTest();
    expect(evaluateFirstResponse(design, "oneself but only observable behavior", sourceContext).status).toBe("INDETERMINATE");
    expect(evaluateFirstResponse(design, "oneself and others", "substituted source")).toMatchObject({ status: "EVALUATION_FAILURE", message: "Supporting source context differs from the approved source boundary." });
    expect(evaluateFirstResponse(design, "oneself and others", "   ").status).toBe("EVALUATION_FAILURE");
  });

  it("requires a non-empty correction and evaluates only the selected target", () => {
    const first = evaluateFirstResponse(createApprovedPairForTest(), "others", sourceContext);
    if (first.status !== "CORRECTION_REQUIRED") throw new Error("Expected correction branch.");
    expect(() => evaluateCorrectionResponse(first, "  ")).toThrow("one fresh active correction response");
    expect(evaluateCorrectionResponse(first, "Now I include oneself.")).toMatchObject({ status: "CORRECTED", correctionResponse: "Now I include oneself." });
    expect(evaluateCorrectionResponse(first, "Still only observable behavior.").status).toBe("NOT_CORRECTED");
    expect(evaluateCorrectionResponse(first, "Only others are included.").status).toBe("NOT_CORRECTED");
  });

  it("keeps correction indeterminate and evaluation failure explicit and terminal", () => {
    const first = evaluateFirstResponse(createApprovedPairForTest(), "others", sourceContext);
    if (first.status !== "CORRECTION_REQUIRED") throw new Error("Expected correction branch.");
    expect(evaluateCorrectionResponse(first, "oneself and only observable behavior").status).toBe("INDETERMINATE");
    expect(evaluateCorrectionResponse({ ...first, supportingSourceContext: "substituted source" }, "oneself")).toMatchObject({ status: "EVALUATION_FAILURE", message: "Supporting source context differs from the approved source boundary." });
  });
});

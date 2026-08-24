import { describe, expect, it } from "vitest";

import { deriveLearningDesign } from "./deriveLearningDesign";
import { requireApprovedLearningDesign } from "./learningDesignExecution";
import { approveLearningDesign, invalidateLearningDesign } from "./learningDesignLifecycle";
import {
  createAuthorityIdentity,
  formResponseEvaluationContract,
  reviewResponseEvaluationContract,
  validateResponseEvaluationContract,
} from "./responseEvaluationContract";

function proposed() {
  return deriveLearningDesign({
    learningObjective: { statement: "Explain mentalization." },
    relevantContext: { description: "Bounded context.", durableRetentionOfPreviouslyAcquiredKnowledgeIntended: true },
  });
}

function input(design = proposed()) {
  const boundary = { startOffset: 2, endOffset: 24 };
  return {
    design,
    contractInput: {
      identity: "contract-1",
      learningObjectiveIdentity: design.learningObjectiveIdentity,
      supportingSource: { identity: createAuthorityIdentity("source", { context: "Source context", boundary }), boundary },
      correctionRequirementReference: design.feedbackResultRequirement.description,
      requiredResponseElements: [{
        identity: "element-1",
        claim: "Mentalization concerns mental states.",
        acceptedFormulations: ["understanding mental states"],
        contradictingFormulations: ["only observable behavior"],
        informativeFeedback: "Include understanding mental states.",
      }],
    },
  };
}

function approvedPair() {
  const { design, contractInput } = input();
  const contract = formResponseEvaluationContract(design, contractInput, "Source context");
  return approveLearningDesign(design, reviewResponseEvaluationContract(design, contract, true));
}

describe("Response Evaluation Contract approval binding", () => {
  it("forms one same-design Creator-authored contract and atomically exposes the immutable approved pair", () => {
    const approved = approvedPair();
    const executable = requireApprovedLearningDesign(approved);

    expect(executable.responseEvaluationContractIdentity).toBe("contract-1");
    expect(executable.responseEvaluationContract.requiredResponseElements[0]).toMatchObject({
      claim: "Mentalization concerns mental states.",
      informativeFeedback: "Include understanding mental states.",
    });
    expect(Object.isFrozen(executable.responseEvaluationContract)).toBe(true);
    expect(Object.isFrozen(executable.responseEvaluationContract.requiredResponseElements[0])).toBe(true);
    expect(executable).not.toHaveProperty("correctionResult");
  });

  it("fails closed when the contract is missing, unreviewed, cross-design, or changed after review", () => {
    const { design, contractInput } = input();
    const contract = formResponseEvaluationContract(design, contractInput, "Source context");
    expect(() => approveLearningDesign(design)).toThrow("exact reviewed Response Evaluation Contract");
    expect(() => reviewResponseEvaluationContract(design, contract, false)).toThrow("Creator review confirmation");

    const otherDesign = proposed();
    expect(() => reviewResponseEvaluationContract(otherDesign, contract, true)).toThrow("same Proposed Learning Design");

    const reviewed = reviewResponseEvaluationContract(design, contract, true);
    contract.requiredResponseElements[0].claim = "Changed after review";
    expect(() => approveLearningDesign(design, reviewed)).toThrow("changed after Creator review");
    expect(() => requireApprovedLearningDesign(design)).toThrow("APPROVED learning design");
  });

  it.each([
    ["missing identity", { identity: "" }, "stable identity"],
    ["missing objective identity", { learningObjectiveIdentity: "" }, "Learning Objective identity"],
    ["missing source identity", { supportingSource: { identity: "", boundary: { startOffset: 2, endOffset: 24 } } }, "supporting source"],
    ["invalid source boundary", { supportingSource: { identity: "source-1", boundary: { startOffset: 24, endOffset: 2 } } }, "valid immutable source boundary"],
    ["missing elements", { requiredResponseElements: [] }, "at least one ordered response element"],
  ] as const)("rejects %s", (_name, change, message) => {
    const { design, contractInput } = input();
    expect(() => formResponseEvaluationContract(design, { ...contractInput, ...change }, "Source context")).toThrow(message);
  });

  it("enforces formulation normalization constraints without adding equivalence", () => {
    const { design, contractInput } = input();
    expect(() => formResponseEvaluationContract(design, {
      ...contractInput,
      requiredResponseElements: [{ ...contractInput.requiredResponseElements[0], acceptedFormulations: ["Same."], contradictingFormulations: [" same "] }],
    }, "Source context")).toThrow("both accepted and contradicting");
  });

  it("rejects objective, source, mechanism, and correction-requirement mismatches", () => {
    const { design, contractInput } = input();
    expect(() => formResponseEvaluationContract(design, { ...contractInput, learningObjectiveIdentity: "other-objective" }, "Source context")).toThrow("Learning Objective does not match");
    expect(() => formResponseEvaluationContract(design, contractInput, "Substituted source context")).toThrow("supporting source does not match");
    const formed = formResponseEvaluationContract(design, contractInput, "Source context");
    expect(() => validateResponseEvaluationContract(design, { ...formed, mechanism: "other" as "bounded-retrieval" })).toThrow("mechanism does not match");
    expect(() => formResponseEvaluationContract(design, { ...contractInput, correctionRequirementReference: "Other requirement" }, "Source context")).toThrow("correction requirement does not match");
  });

  it("rejects an execution-time contract substitution even when stable identities are copied", () => {
    const approved = approvedPair();
    const substituted = Object.freeze({
      ...approved,
      responseEvaluationContract: Object.freeze({
        ...approved.responseEvaluationContract,
        requiredResponseElements: Object.freeze([{ ...approved.responseEvaluationContract.requiredResponseElements[0], claim: "Substituted claim" }]),
      }),
    });
    expect(() => requireApprovedLearningDesign(substituted)).toThrow("APPROVED learning design");
  });

  it("requires invalidation and a fresh proposal, contract, review, and approval after a premise change", () => {
    const approved = approvedPair();
    const invalidated = invalidateLearningDesign(approved);
    expect(() => requireApprovedLearningDesign(invalidated)).toThrow("APPROVED learning design");

    const fresh = proposed();
    expect(fresh.identity).not.toBe(approved.identity);
    expect(() => approveLearningDesign(fresh)).toThrow("exact reviewed Response Evaluation Contract");
  });
});

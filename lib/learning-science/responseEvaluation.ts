import { requireApprovedLearningDesign } from "./learningDesignExecution";
import { createAuthorityIdentity } from "./responseEvaluationContract";
import type {
  ApprovedLearningDesign,
  LearningDesign,
  RequiredResponseElement,
} from "./types";

type ElementState = "EVIDENCED" | "CONTRADICTED" | "ABSENT" | "INDETERMINATE";

export type FirstResponseResult =
  | { status: "NO_CORRECTION_REQUIRED"; learnerResponse: string; approvedDesign: ApprovedLearningDesign; supportingSourceContext: string }
  | { status: "CORRECTION_REQUIRED"; learnerResponse: string; approvedDesign: ApprovedLearningDesign; supportingSourceContext: string; target: Readonly<RequiredResponseElement>; targetState: "CONTRADICTED" | "ABSENT" }
  | { status: "INDETERMINATE"; learnerResponse: string; approvedDesign: ApprovedLearningDesign; supportingSourceContext: string }
  | { status: "EVALUATION_FAILURE"; learnerResponse: string; approvedDesign: ApprovedLearningDesign; supportingSourceContext: string; message: string };

export type CorrectionResult = {
  status: "CORRECTED" | "NOT_CORRECTED" | "INDETERMINATE" | "EVALUATION_FAILURE";
  correctionResponse: string;
  firstResult: Extract<FirstResponseResult, { status: "CORRECTION_REQUIRED" }>;
  message?: string;
};

function normalize(value: string) {
  return value.normalize("NFKC").toLowerCase().replace(/\s+/gu, " ").trim().replace(/[.!?]+$/u, "");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matches(response: string, formulation: string) {
  return new RegExp(`(?<![\\p{L}\\p{Nd}])${escapeRegExp(normalize(formulation))}(?![\\p{L}\\p{Nd}])`, "u").test(response);
}

function evaluateElement(response: string, element: Readonly<RequiredResponseElement>): ElementState {
  const accepted = element.acceptedFormulations.some((value) => matches(response, value));
  const contradicted = element.contradictingFormulations.some((value) => matches(response, value));
  if (accepted && contradicted) return "INDETERMINATE";
  if (accepted) return "EVIDENCED";
  if (contradicted) return "CONTRADICTED";
  return "ABSENT";
}

function assertExecutionAuthority(approvedDesign: ApprovedLearningDesign, supportingSourceContext: string) {
  const contract = approvedDesign.responseEvaluationContract;
  if (approvedDesign.proposedLearningMechanism.kind !== "bounded-retrieval" || contract.mechanism !== "bounded-retrieval") {
    throw new Error("Approved learning design does not authorize the bounded retrieval mechanism.");
  }
  if (contract.learningObjectiveIdentity !== approvedDesign.learningObjectiveIdentity || contract.proposedLearningDesignIdentity !== approvedDesign.identity) {
    throw new Error("Approved evaluation authority is not traceable to this Learning Design and Learning Objective.");
  }
  if (!supportingSourceContext.trim()) throw new Error("Source-grounded evaluation requires supporting source context.");
  const sourceIdentity = createAuthorityIdentity("source", { context: supportingSourceContext, boundary: contract.supportingSource.boundary });
  if (sourceIdentity !== contract.supportingSource.identity) throw new Error("Supporting source context differs from the approved source boundary.");
  if (contract.requiredResponseElements.length === 0) throw new Error("Approved evaluation authority has no required response elements.");
}

export function evaluateFirstResponse(
  learningDesign: LearningDesign,
  learnerResponse: string,
  supportingSourceContext: string,
): FirstResponseResult {
  const approvedDesign = requireApprovedLearningDesign(learningDesign);
  const response = learnerResponse.trim();
  if (!response) throw new Error("The learner must provide an active response before reveal.");
  try {
    assertExecutionAuthority(approvedDesign, supportingSourceContext);
    const normalizedResponse = normalize(response);
    const states = approvedDesign.responseEvaluationContract.requiredResponseElements.map((element) => ({ element, state: evaluateElement(normalizedResponse, element) }));
    if (states.some(({ state }) => state === "INDETERMINATE")) {
      return { status: "INDETERMINATE", learnerResponse: response, approvedDesign, supportingSourceContext };
    }
    if (states.every(({ state }) => state === "EVIDENCED")) {
      return { status: "NO_CORRECTION_REQUIRED", learnerResponse: response, approvedDesign, supportingSourceContext };
    }
    const selected = states.find(({ state }) => state === "CONTRADICTED" || state === "ABSENT");
    if (!selected || (selected.state !== "CONTRADICTED" && selected.state !== "ABSENT")) throw new Error("No approved correction target could be selected.");
    return { status: "CORRECTION_REQUIRED", learnerResponse: response, approvedDesign, supportingSourceContext, target: selected.element, targetState: selected.state };
  } catch (error) {
    return { status: "EVALUATION_FAILURE", learnerResponse: response, approvedDesign, supportingSourceContext, message: error instanceof Error ? error.message : "Evaluation failed." };
  }
}

export function evaluateCorrectionResponse(
  firstResult: Extract<FirstResponseResult, { status: "CORRECTION_REQUIRED" }>,
  correctionResponse: string,
): CorrectionResult {
  const response = correctionResponse.trim();
  if (!response) throw new Error("The learner must provide one fresh active correction response.");
  try {
    const approvedDesign = requireApprovedLearningDesign(firstResult.approvedDesign);
    assertExecutionAuthority(approvedDesign, firstResult.supportingSourceContext);
    const unchangedTarget = approvedDesign.responseEvaluationContract.requiredResponseElements.find(({ identity }) => identity === firstResult.target.identity);
    if (!unchangedTarget || unchangedTarget !== firstResult.target) throw new Error("The approved correction target changed after the first evaluation.");
    const state = evaluateElement(normalize(response), unchangedTarget);
    if (state === "INDETERMINATE") return { status: "INDETERMINATE", correctionResponse: response, firstResult };
    return { status: state === "EVIDENCED" ? "CORRECTED" : "NOT_CORRECTED", correctionResponse: response, firstResult };
  } catch (error) {
    return { status: "EVALUATION_FAILURE", correctionResponse: response, firstResult, message: error instanceof Error ? error.message : "Evaluation failed." };
  }
}

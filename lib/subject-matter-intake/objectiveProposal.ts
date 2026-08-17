import type { SupportingSourceBoundary } from "./extractSourceMaterial";

export interface ObjectiveProposal {
  state: "PROPOSED";
  statement: string;
  supportingSourceBoundary: SupportingSourceBoundary;
}

export function createObjectiveProposal(
  statement: string,
  supportingSourceBoundary: SupportingSourceBoundary,
): ObjectiveProposal {
  const normalizedStatement = statement.trim();

  if (!normalizedStatement) {
    throw new Error("Objective proposal requires a non-empty statement.");
  }

  return {
    state: "PROPOSED",
    statement: normalizedStatement,
    supportingSourceBoundary,
  };
}

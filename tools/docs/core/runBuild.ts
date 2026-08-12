import { runBuild } from "../checks/runBuild";
import { checkDocumentationStructure } from "./checkDocumentationStructure";
import { printDocumentationStructureResult } from "../output/printDocumentationStructureResult";

export function runVerification(): boolean {
  const buildSuccessful = runBuild();

  const documentationResult = checkDocumentationStructure();

  printDocumentationStructureResult(documentationResult);

  return buildSuccessful && documentationResult.valid;
}
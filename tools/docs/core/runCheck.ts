import { checkDocumentationStructure } from "./checkDocumentationStructure";
import { printDocumentationStructureResult } from "../output/printDocumentationStructureResult";

export function runCheck(): boolean {
  const result = checkDocumentationStructure();

  printDocumentationStructureResult(result);

  return result.valid;
}
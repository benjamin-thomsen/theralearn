import { printDocumentationStructureResult } from "../output/printDocumentationStructureResult";
import { validateDocumentationStructure } from "../validation/validateDocumentationStructure";

export function runDocumentationCheck(): boolean {
  const result = validateDocumentationStructure();

  printDocumentationStructureResult(result);

  return result.valid;
}
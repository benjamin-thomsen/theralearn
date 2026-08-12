import type { DocumentationStructureValidationResult } from "../validation/validateDocumentationStructure";

export function printDocumentationStructureResult(
  result: DocumentationStructureValidationResult,
): void {
  console.log("Checking documentation structure...");
  console.log("");

  for (const directory of result.existingDirectories) {
    console.log(`✓ ${directory}`);
  }

  for (const directory of result.missingDirectories) {
    console.log(`✗ ${directory}`);
  }

  console.log("");

  if (result.valid) {
    console.log("Documentation structure is valid.");
  } else {
    console.log("Documentation structure is NOT valid.");
  }
}

import type { RepositoryIndexCompletenessValidationResult } from "../validation/validateRepositoryIndexCompleteness";

export function printRepositoryIndexResult(
  result: RepositoryIndexCompletenessValidationResult,
): void {
  console.log("Checking repository index completeness...");
  console.log("");

  console.log(`Tracked files: ${result.trackedFiles.length}`);
  console.log(`Indexed files: ${result.indexedFiles.length}`);
  console.log("");

  if (!result.indexReadable) {
    console.log("✗ INDHOLDSFORTEGNELSE.md could not be read.");
    console.log("");
    console.log("Repository index completeness is NOT valid.");
    return;
  }

  if (result.missingFiles.length > 0) {
    console.log("Missing index entries:");

    for (const file of result.missingFiles) {
      console.log(`✗ ${file}`);
    }

    console.log("");
  }

  if (result.obsoleteFiles.length > 0) {
    console.log("Obsolete index entries:");

    for (const file of result.obsoleteFiles) {
      console.log(`✗ ${file}`);
    }

    console.log("");
  }

  if (result.duplicateFiles.length > 0) {
    console.log("Duplicate index entries:");

    for (const file of result.duplicateFiles) {
      console.log(`✗ ${file}`);
    }

    console.log("");
  }

  if (result.valid) {
    console.log("✓ Every tracked file has exactly one canonical index entry.");
    console.log("✓ No obsolete index entries found.");
    console.log("✓ No duplicate index entries found.");
    console.log("");
    console.log("Repository index completeness is valid.");
  } else {
    console.log("Repository index completeness is NOT valid.");
  }
}
export interface VerificationSummary {
  typeScriptValid: boolean;
  buildValid: boolean;
  documentationValid: boolean;
  gitStatusValid: boolean;
}

function formatStatus(valid: boolean): string {
  return valid ? "PASS" : "FAIL";
}

export function printVerificationSummary(
  summary: VerificationSummary,
): void {
  const verificationValid =
    summary.typeScriptValid &&
    summary.buildValid &&
    summary.documentationValid &&
    summary.gitStatusValid;

  console.log("");
  console.log("Verification Summary");
  console.log("====================");
  console.log(
    `TypeScript Check    ${formatStatus(summary.typeScriptValid)}`,
  );
  console.log(`Build               ${formatStatus(summary.buildValid)}`);
  console.log(
    `Documentation Check ${formatStatus(summary.documentationValid)}`,
  );
  console.log(`Git Status          ${formatStatus(summary.gitStatusValid)}`);
  console.log("--------------------");
  console.log(`Overall             ${formatStatus(verificationValid)}`);
  console.log("");
}
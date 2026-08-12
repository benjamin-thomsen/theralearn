import { runBuild } from "../checks/runBuild";
import { runDocumentationCheck } from "../checks/runDocumentationCheck";
import { runGitStatus } from "../checks/runGitStatus";
import { printVerificationSummary } from "../output/printVerificationSummary";

export function runVerification(): boolean {
  const buildValid = runBuild();
  const documentationValid = runDocumentationCheck();
  const gitStatusValid = runGitStatus();

  printVerificationSummary({
    buildValid,
    documentationValid,
    gitStatusValid,
  });

  return buildValid && documentationValid && gitStatusValid;
}
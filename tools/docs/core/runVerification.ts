import { runBuild } from "../checks/runBuild";
import { runDocumentationCheck } from "../checks/runDocumentationCheck";
import { runGitStatus } from "../checks/runGitStatus";
import { runRepositoryIndexCheck } from "../checks/runRepositoryIndexCheck";
import { runTypeScriptCheck } from "../checks/runTypeScriptCheck";
import { printVerificationSummary } from "../output/printVerificationSummary";

export function runVerification(): boolean {
  const typeScriptValid = runTypeScriptCheck();
  const buildValid = runBuild();
  const documentationValid = runDocumentationCheck();
  const repositoryIndexValid = runRepositoryIndexCheck();
  const gitStatusValid = runGitStatus();

  printVerificationSummary({
    typeScriptValid,
    buildValid,
    documentationValid,
    repositoryIndexValid,
    gitStatusValid,
  });

  return (
    typeScriptValid &&
    buildValid &&
    documentationValid &&
    repositoryIndexValid &&
    gitStatusValid
  );
}
import { renderOutput } from "../output/renderOutput";
import { runIndex } from "./runIndex";
import { runVerification } from "./runVerification";

export function runCheckpoint(): boolean {
  console.log("Preparing repository checkpoint...");
  console.log("");

  const indexValid = runIndex();

  if (!indexValid) {
    renderOutput({
      title: "CHECKPOINT FAILED",
      status: "error",
      message: "Repository index generation failed.",
    });

    return false;
  }

  console.log("");

  const verificationValid = runVerification();

  console.log("");

  renderOutput({
    title: verificationValid ? "CHECKPOINT PASS" : "CHECKPOINT FAIL",
    status: verificationValid ? "success" : "error",
    message: verificationValid
      ? "Repository index synchronized and complete verification passed."
      : "Repository checkpoint verification failed.",
  });

  return verificationValid;
}
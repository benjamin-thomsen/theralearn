import { runVerification } from "../core/runVerification";

export function verify(): void {
  const success = runVerification();

  if (!success) {
    process.exitCode = 1;
  }
}

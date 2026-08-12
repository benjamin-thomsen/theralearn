import { runCommand } from "../core/runCommand";
import { runVerification } from "../core/runVerification";

export function verify(): void {
  runCommand(runVerification);
}
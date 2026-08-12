import { runCommand } from "../core/runCommand";
import { runCheck } from "../core/runCheck";

export function check(): void {
  runCommand(runCheck);
}
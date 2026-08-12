import { runStatus } from "../core/runStatus";
import { runCommand } from "../core/runCommand";

export function status(): void {
  runCommand(runStatus);
}
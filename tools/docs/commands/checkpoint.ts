import { runCommand } from "../core/runCommand";
import { runCheckpoint } from "../core/runCheckpoint";

export function checkpoint(): void {
  runCommand(runCheckpoint);
}

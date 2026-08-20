import { runCommand } from "../core/runCommand";
import { runPatch } from "../core/runPatch";

export function patch(filePath: string): void {
  runCommand(() => runPatch(filePath));
}

import { runCopy } from "../core/runCopy";
import { runCommand } from "../core/runCommand";

export function copy(filePath: string): void {
  runCommand(() => runCopy(filePath));
}
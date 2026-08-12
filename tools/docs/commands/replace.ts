import { runCommand } from "../core/runCommand";
import { runReplace } from "../core/runReplace";

export function replace(filePath: string): void {
  runCommand(() => runReplace(filePath));
}
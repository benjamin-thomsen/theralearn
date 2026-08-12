import { runCommand } from "../core/runCommand";
import { runFile } from "../core/runFile";

export function file(filePath: string): void {
  runCommand(() => runFile(filePath));
}
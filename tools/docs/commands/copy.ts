import { runCopy } from "../core/runCopy";

export function copy(filePath: string): void {
  const success = runCopy(filePath);

  if (!success) {
    process.exitCode = 1;
  }
}
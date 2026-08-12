import { runReplace } from "../core/runReplace";

export function replace(filePath: string): void {
  const success = runReplace(filePath);

  if (!success) {
    process.exitCode = 1;
  }
}
import { runFile } from "../core/runFile";

export function file(filePath: string): void {
  const success = runFile(filePath);

  if (!success) {
    process.exitCode = 1;
  }
}
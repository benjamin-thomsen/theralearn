import { runEdit } from "../core/runEdit";

export function edit(filePath: string): void {
  const success = runEdit(filePath);

  if (!success) {
    process.exitCode = 1;
  }
}
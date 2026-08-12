import { renderOutput } from "./renderOutput";

export function printEditError(filePath: string): void {
  renderOutput({
    title: "EDIT FAILED",
    activeFile: filePath,
    status: "error",
    message: "The file could not be prepared or opened for editing.",
  });
}
import { renderOutput } from "./renderOutput";

export function printEditSuccess(filePath: string): void {
  renderOutput({
    title: "EDIT READY",
    activeFile: filePath,
    status: "success",
    message: "The file is open in VS Code and ready for editing.",
  });
}
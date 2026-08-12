import { renderOutput } from "./renderOutput";

export function printReplaceError(filePath: string): void {
  renderOutput({
    status: "error",
    message: `Failed to prepare: ${filePath}\nThe file could not be cleared and opened for replacement.`,
  });
}
import { renderOutput } from "./renderOutput";

export function printReplaceSuccess(filePath: string): void {
  renderOutput({
    status: "success",
    message: `Successfully prepared: ${filePath}\nThe file has been cleared and is ready for replacement.`,
  });
}
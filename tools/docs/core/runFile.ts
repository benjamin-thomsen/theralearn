import { readFile } from "../filesystem/readFile";
import { printFile } from "../output/printFile";
import { validateFilePath } from "../validation/validateFilePath";

export function runFile(filePath: string): boolean {
  if (!validateFilePath(filePath)) {
    return false;
  }

  const content = readFile(filePath);

  if (content === null) {
    return false;
  }

  printFile({
    filePath,
    content,
  });

  return true;
}
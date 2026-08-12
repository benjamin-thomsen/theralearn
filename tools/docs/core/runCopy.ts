import { copyToClipboard } from "../clipboard/copyToClipboard";
import { readFile } from "../filesystem/readFile";
import { validateFilePath } from "../validation/validateFilePath";

export function runCopy(filePath: string): boolean {
  if (!validateFilePath(filePath)) {
    return false;
  }

  const content = readFile(filePath);

  if (content === null) {
    return false;
  }

  return copyToClipboard(content);
}
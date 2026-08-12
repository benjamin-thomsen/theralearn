import { openFileInEditor } from "../editor/openFileInEditor";
import { truncateFile } from "../filesystem/truncateFile";
import { printReplaceError } from "../output/printReplaceError";
import { printReplaceSuccess } from "../output/printReplaceSuccess";
import { validateFilePath } from "../validation/validateFilePath";

export function runReplace(filePath: string): boolean {
  if (!validateFilePath(filePath)) {
    printReplaceError(filePath);
    return false;
  }

  if (!truncateFile(filePath)) {
    printReplaceError(filePath);
    return false;
  }

  if (!openFileInEditor(filePath)) {
    printReplaceError(filePath);
    return false;
  }

  printReplaceSuccess(filePath);

  return true;
}
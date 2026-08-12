import { openFileInEditor } from "../editor/openFileInEditor";
import { printEditError } from "../output/printEditError";
import { printEditSuccess } from "../output/printEditSuccess";
import { validateFilePath } from "../validation/validateFilePath";

export function runEdit(filePath: string): boolean {
  if (!validateFilePath(filePath)) {
    printEditError(filePath);
    return false;
  }

  if (!openFileInEditor(filePath)) {
    printEditError(filePath);
    return false;
  }

  printEditSuccess(filePath);

  return true;
}
import { pathExists } from "../filesystem/exists";
import { openFileInEditor } from "../editor/openFileInEditor";
import { writeFile } from "../filesystem/writeFile";
import { printEditError } from "../output/printEditError";
import { printEditSuccess } from "../output/printEditSuccess";

export function runEdit(filePath: string): boolean {
  if (filePath.trim() === "") {
    printEditError(filePath);
    return false;
  }

  const filePrepared = pathExists(filePath)
    ? true
    : writeFile(filePath, "");

  if (!filePrepared) {
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
import { pathExists } from "../filesystem/exists";
import { openFileInEditor } from "../editor/openFileInEditor";
import { truncateFile } from "../filesystem/truncateFile";
import { writeFile } from "../filesystem/writeFile";
import { printEditError } from "../output/printEditError";
import { printEditSuccess } from "../output/printEditSuccess";

export function runEdit(filePath: string): boolean {
  if (filePath.trim() === "") {
    printEditError(filePath);
    return false;
  }

  const filePrepared = pathExists(filePath)
    ? truncateFile(filePath)
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
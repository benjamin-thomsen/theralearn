import { statSync } from "node:fs";
import { pathExists } from "../filesystem/exists";

/**
 * Returns true if the given path exists and points to a file.
 */
export function validateFilePath(filePath: string): boolean {
  if (filePath.trim() === "") {
    return false;
  }

  if (!pathExists(filePath)) {
    return false;
  }

  try {
    return statSync(filePath).isFile();
  } catch {
    return false;
  }
}
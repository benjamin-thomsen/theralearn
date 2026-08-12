import { truncateSync } from "node:fs";

/**
 * Empties an existing file.
 * Returns false if the file cannot be truncated.
 */
export function truncateFile(filePath: string): boolean {
  try {
    truncateSync(filePath, 0);
    return true;
  } catch {
    return false;
  }
}
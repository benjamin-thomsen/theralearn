import { writeFileSync } from "node:fs";

/**
 * Writes UTF-8 content to a file.
 * Returns false if the file cannot be written.
 */
export function writeFile(filePath: string, content: string): boolean {
  try {
    writeFileSync(filePath, content, "utf8");
    return true;
  } catch {
    return false;
  }
}
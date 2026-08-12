import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

/**
 * Writes UTF-8 content to a file.
 * Creates missing parent directories automatically.
 * Returns false if the file cannot be written.
 */
export function writeFile(filePath: string, content: string): boolean {
  try {
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, content, "utf8");

    return true;
  } catch {
    return false;
  }
}
import { readFileSync } from "node:fs";

/**
 * Reads a UTF-8 file and returns its content.
 * Returns null if the file cannot be read.
 */
export function readFile(filePath: string): string | null {
  try {
    return readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}
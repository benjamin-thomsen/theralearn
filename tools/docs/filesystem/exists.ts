import { existsSync } from "node:fs";

/**
 * Returns true if the given path exists.
 */
export function pathExists(path: string): boolean {
  return existsSync(path);
}

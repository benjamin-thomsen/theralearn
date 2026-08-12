import { spawnSync } from "node:child_process";

/**
 * Copies text to the macOS clipboard.
 *
 * Returns true when the clipboard command succeeds.
 * Returns false when the clipboard command fails.
 */
export function copyToClipboard(content: string): boolean {
  const result = spawnSync("pbcopy", [], {
    input: content,
    encoding: "utf8",
  });

  return result.status === 0 && result.error === undefined;
}
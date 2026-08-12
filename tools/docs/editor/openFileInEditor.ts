import { spawnSync } from "node:child_process";

/**
 * Opens a file in Visual Studio Code.
 * Returns true if VS Code was launched successfully.
 */
export function openFileInEditor(filePath: string): boolean {
  const result = spawnSync("code", [filePath], {
    stdio: "inherit",
  });

  return result.status === 0;
}
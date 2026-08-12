import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

/**
 * Opens a file in the active Visual Studio Code window.
 * Positions the cursor at the beginning of the file.
 * Returns true if VS Code opened the file successfully.
 */
export function openFileInEditor(filePath: string): boolean {
  const absoluteFilePath = resolve(filePath);

  const result = spawnSync(
    "code",
    ["--reuse-window", "--goto", `${absoluteFilePath}:1:1`],
    {
      stdio: "inherit",
    },
  );

  return result.status === 0;
}
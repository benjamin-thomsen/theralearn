import { spawnSync } from "node:child_process";

export function runTypeScriptCheck(): boolean {
  console.log("Running TypeScript check...");
  console.log("");

  const result = spawnSync("npx", ["tsc", "--noEmit"], {
    stdio: "inherit",
    shell: false,
  });

  console.log("");

  if (result.error) {
    console.error("TypeScript check could not be started.");
    console.error(result.error.message);

    return false;
  }

  if (result.status !== 0) {
    console.error("TypeScript check failed.");

    return false;
  }

  console.log("TypeScript check completed successfully.");

  return true;
}
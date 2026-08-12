import { spawnSync } from "node:child_process";

export function runGitStatus(): boolean {
  console.log("Running Git status...");
  console.log("");

  const result = spawnSync("git", ["status", "--short"], {
    stdio: "inherit",
    shell: false,
  });

  console.log("");

  if (result.error) {
    console.error("Git status could not be started.");
    console.error(result.error.message);

    return false;
  }

  if (result.status !== 0) {
    console.error("Git status failed.");

    return false;
  }

  console.log("Git status completed successfully.");

  return true;
}
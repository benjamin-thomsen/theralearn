import { spawnSync } from "node:child_process";

export function runBuild(): boolean {
  console.log("Running build...");
  console.log("");

  const result = spawnSync("npm", ["run", "build"], {
    stdio: "inherit",
    shell: false,
  });

  console.log("");

  if (result.error) {
    console.error("Build could not be started.");
    console.error(result.error.message);

    return false;
  }

  if (result.status !== 0) {
    console.error("Build failed.");

    return false;
  }

  console.log("Build completed successfully.");

  return true;
}
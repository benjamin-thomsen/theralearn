import { pathExists } from "../filesystem/exists";

const REQUIRED_DIRECTORIES = [
  "docs",
  "docs/architecture",
  "docs/product",
  "docs/design",
  "docs/development",
  "docs/decisions",
  "docs/guides",
  "docs/references",
  "docs/meetings",
  "docs/changelog",
  "docs/templates",
];

export function check(): void {
  console.log("Checking documentation structure...");
  console.log("");

  let valid = true;

  for (const directory of REQUIRED_DIRECTORIES) {
    if (pathExists(directory)) {
      console.log(`✓ ${directory}`);
    } else {
      console.log(`✗ ${directory}`);
      valid = false;
    }
  }

  console.log("");

  if (valid) {
    console.log("Documentation structure is valid.");
  } else {
    console.log("Documentation structure is NOT valid.");
    process.exitCode = 1;
  }
}

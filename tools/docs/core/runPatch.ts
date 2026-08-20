import { readFileSync } from "node:fs";
import { readFile } from "../filesystem/readFile";
import { writeFile } from "../filesystem/writeFile";
import { validateFilePath } from "../validation/validateFilePath";

export type PatchSpecification = {
  find: string;
  replace: string;
};

export function applyExactPatch(
  content: string,
  patch: PatchSpecification,
): string | null {
  const firstMatch = content.indexOf(patch.find);

  if (
    firstMatch === -1 ||
    content.indexOf(patch.find, firstMatch + patch.find.length) !== -1
  ) {
    return null;
  }

  return (
    content.slice(0, firstMatch) +
    patch.replace +
    content.slice(firstMatch + patch.find.length)
  );
}

function readPatchSpecification(): PatchSpecification | null {
  try {
    const value: unknown = JSON.parse(readFileSync(0, "utf8"));
    if (
      typeof value !== "object" ||
      value === null ||
      !("find" in value) ||
      !("replace" in value) ||
      typeof value.find !== "string" ||
      typeof value.replace !== "string" ||
      value.find.length === 0
    ) {
      return null;
    }

    return { find: value.find, replace: value.replace };
  } catch {
    return null;
  }
}

export function runPatch(filePath: string): boolean {
  if (!validateFilePath(filePath)) {
    console.error(`PATCH FAIL: invalid file: ${filePath}`);
    return false;
  }

  const patch = readPatchSpecification();

  if (patch === null) {
    console.error("PATCH FAIL: invalid patch specification");
    return false;
  }

  const content = readFile(filePath);

  if (content === null) {
    console.error(`PATCH FAIL: could not read file: ${filePath}`);
    return false;
  }

  const nextContent = applyExactPatch(content, patch);

  if (nextContent === null) {
    console.error("PATCH FAIL: target must match exactly once");
    return false;
  }

  if (!writeFile(filePath, nextContent)) {
    console.error(`PATCH FAIL: could not write file: ${filePath}`);
    return false;
  }

  console.log(`PATCH PASS: ${filePath}`);
  return true;
}

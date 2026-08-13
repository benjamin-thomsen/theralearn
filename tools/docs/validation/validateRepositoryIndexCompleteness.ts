import { execFileSync } from "node:child_process";
import { readFile } from "../filesystem/readFile";

const INDEX_FILE = "INDHOLDSFORTEGNELSE.md";

export interface RepositoryIndexCompletenessValidationResult {
  valid: boolean;
  trackedFiles: string[];
  indexedFiles: string[];
  missingFiles: string[];
  obsoleteFiles: string[];
  duplicateFiles: string[];
  indexReadable: boolean;
}

function getTrackedFiles(): string[] {
  const output = execFileSync("git", ["ls-files"], {
    encoding: "utf8",
  });

  return output
    .split("\n")
    .map((file) => file.trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

function getIndexedFiles(content: string): string[] {
  const indexedFiles: string[] = [];
  const entryPattern = /^- \[`([^`]+)`\]\(\.\/([^)]+)\)$/gm;

  for (const match of content.matchAll(entryPattern)) {
    const label = match[1];
    const target = match[2];

    if (label === target) {
      indexedFiles.push(target);
    }
  }

  return indexedFiles;
}

function findDuplicates(files: string[]): string[] {
  const counts = new Map<string, number>();

  for (const file of files) {
    counts.set(file, (counts.get(file) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .filter(([, count]) => count > 1)
    .map(([file]) => file)
    .sort((a, b) => a.localeCompare(b));
}

export function validateRepositoryIndexCompleteness(): RepositoryIndexCompletenessValidationResult {
  const trackedFiles = getTrackedFiles();
  const content = readFile(INDEX_FILE);

  if (content === null) {
    return {
      valid: false,
      trackedFiles,
      indexedFiles: [],
      missingFiles: trackedFiles,
      obsoleteFiles: [],
      duplicateFiles: [],
      indexReadable: false,
    };
  }

  const indexedFiles = getIndexedFiles(content);
  const trackedFileSet = new Set(trackedFiles);
  const indexedFileSet = new Set(indexedFiles);

  const missingFiles = trackedFiles
    .filter((file) => !indexedFileSet.has(file))
    .sort((a, b) => a.localeCompare(b));

  const obsoleteFiles = Array.from(indexedFileSet)
    .filter((file) => !trackedFileSet.has(file))
    .sort((a, b) => a.localeCompare(b));

  const duplicateFiles = findDuplicates(indexedFiles);

  return {
    valid:
      missingFiles.length === 0 &&
      obsoleteFiles.length === 0 &&
      duplicateFiles.length === 0,
    trackedFiles,
    indexedFiles,
    missingFiles,
    obsoleteFiles,
    duplicateFiles,
    indexReadable: true,
  };
}
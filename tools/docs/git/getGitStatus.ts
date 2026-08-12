import { spawnSync } from "node:child_process";

export interface GitStatus {
  available: boolean;
  branch: string;
  latestCommit: string;
  workingTreeClean: boolean;
  modifiedFiles: string[];
  error: string | null;
}

function runGitCommand(args: string[]): string | null {
  const result = spawnSync("git", args, {
    encoding: "utf8",
  });

  if (result.error || result.status !== 0) {
    return null;
  }

  return result.stdout;
}

export function getGitStatus(): GitStatus {
  const branchOutput = runGitCommand(["branch", "--show-current"]);
  const latestCommitOutput = runGitCommand(["log", "-1", "--oneline"]);
  const workingTree = runGitCommand(["status", "--short"]);

  if (
    branchOutput === null ||
    latestCommitOutput === null ||
    workingTree === null
  ) {
    return {
      available: false,
      branch: "",
      latestCommit: "",
      workingTreeClean: false,
      modifiedFiles: [],
      error: "Git status could not be read.",
    };
  }

  const branch = branchOutput.trim();
  const latestCommit = latestCommitOutput.trim();
  const modifiedFiles = workingTree
    .split("\n")
    .filter((line) => line.length > 0);

  return {
    available: true,
    branch,
    latestCommit,
    workingTreeClean: modifiedFiles.length === 0,
    modifiedFiles,
    error: null,
  };
}
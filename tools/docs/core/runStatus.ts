import { getGitStatus } from "../git/getGitStatus";
import { renderOutput } from "../output/renderOutput";

export function runStatus(): boolean {
  const gitStatus = getGitStatus();

  if (!gitStatus.available) {
    renderOutput({
      title: "PROJECT STATUS",
      status: "error",
      message: gitStatus.error ?? "Git status could not be read.",
    });

    return false;
  }

  const workingTree = gitStatus.workingTreeClean
    ? "Clean"
    : `Changes detected (${gitStatus.modifiedFiles.length})`;

  const modifiedFiles =
    gitStatus.modifiedFiles.length > 0
      ? `\n\nChanged files:\n${gitStatus.modifiedFiles.join("\n")}`
      : "";

  renderOutput({
    title: "PROJECT STATUS",
    status: "info",
    message: [
      `Branch: ${gitStatus.branch}`,
      `Latest commit: ${gitStatus.latestCommit}`,
      `Working tree: ${workingTree}`,
    ].join("\n") + modifiedFiles,
  });

  return true;
}
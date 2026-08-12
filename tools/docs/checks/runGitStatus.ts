import { getGitStatus } from "../git/getGitStatus";

export function runGitStatus(): boolean {
  const gitStatus = getGitStatus();

  return gitStatus.available;
}
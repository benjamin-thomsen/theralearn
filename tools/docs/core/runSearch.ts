import { spawnSync } from "node:child_process";

import { renderOutput } from "../output/renderOutput";

export function runSearch(query: string): boolean {
  const normalizedQuery = query.trim();

  if (normalizedQuery.length === 0) {
    renderOutput({
      title: "SEARCH ERROR",
      status: "error",
      message: "A search query is required.",
    });

    return false;
  }

  const result = spawnSync(
    "grep",
    [
      "-R",
      "-n",
      "-I",
      "--exclude-dir=.git",
      "--exclude-dir=.next",
      "--exclude-dir=node_modules",
      "--",
      normalizedQuery,
      ".",
    ],
    {
      encoding: "utf8",
      shell: false,
    },
  );

  if (result.error) {
    renderOutput({
      title: "SEARCH ERROR",
      status: "error",
      message: `The search could not be started: ${result.error.message}`,
    });

    return false;
  }

  if (result.status === 1) {
    renderOutput({
      title: "SEARCH RESULTS",
      status: "info",
      message: `No matches found for "${normalizedQuery}".`,
    });

    return true;
  }

  if (result.status !== 0) {
    const errorMessage = result.stderr.trim();

    renderOutput({
      title: "SEARCH ERROR",
      status: "error",
      message:
        errorMessage.length > 0
          ? errorMessage
          : "The project search failed.",
    });

    return false;
  }

  renderOutput({
    title: "SEARCH RESULTS",
    status: "success",
    message: `Matches for "${normalizedQuery}":`,
  });

  process.stdout.write(result.stdout);

  if (!result.stdout.endsWith("\n")) {
    process.stdout.write("\n");
  }

  return true;
}
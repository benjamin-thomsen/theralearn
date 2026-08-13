import { printRepositoryIndexResult } from "../output/printRepositoryIndexResult";
import { validateRepositoryIndexCompleteness } from "../validation/validateRepositoryIndexCompleteness";

export function runRepositoryIndexCheck(): boolean {
  const result = validateRepositoryIndexCompleteness();

  printRepositoryIndexResult(result);

  return result.valid;
}
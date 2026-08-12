import { runCommand } from "../core/runCommand";
import { runSearch } from "../core/runSearch";

export function search(query: string): void {
  runCommand(() => runSearch(query));
}
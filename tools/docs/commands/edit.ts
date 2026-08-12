import { runCommand } from "../core/runCommand";
import { runEdit } from "../core/runEdit";

export function edit(filePath: string): void {
  runCommand(() => runEdit(filePath));
}
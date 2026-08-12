export type CommandAction = () => boolean;

export function runCommand(action: CommandAction): void {
  const success = action();

  if (!success) {
    process.exitCode = 1;
  }
}
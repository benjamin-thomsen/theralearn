export type OutputStatus = "success" | "error" | "info";

export interface RenderOutputOptions {
  title?: string;
  activeFile?: string;
  status: OutputStatus;
  message: string;
}

export function renderOutput(options: RenderOutputOptions): void {
  console.log("");

  if (options.title) {
    console.log(options.title);
    console.log("=".repeat(options.title.length));
    console.log("");
  }

  if (options.activeFile) {
    console.log("ACTIVE FILE");
    console.log("-----------");
    console.log(options.activeFile);
    console.log("");
  }

  const icon =
    options.status === "success"
      ? "✅"
      : options.status === "error"
        ? "❌"
        : "ℹ️";

  console.log(`${icon} ${options.message}`);
  console.log("");
}
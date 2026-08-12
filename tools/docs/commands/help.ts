/**
 * Help command
 *
 * Displays all available Developer Toolkit commands.
 */
export function help(): void {
  console.log("Available commands:");
  console.log("");

  console.log("  help");
  console.log("      Show this help.");
  console.log("");

  console.log("  check");
  console.log("      Check documentation structure.");
  console.log("");

  console.log("  verify");
  console.log("      Run the complete project verification.");
  console.log("");

  console.log("  status");
  console.log("      Show the current project and Git status.");
  console.log("");

  console.log("  file <file-path>");
  console.log("      Print the complete contents of a file.");
  console.log("");

  console.log("  edit <file-path>");
  console.log("      Open an existing file without changing its contents.");
  console.log("");

  console.log("  replace <file-path>");
  console.log("      Clear an existing file and open it for replacement.");
  console.log("");

  console.log("  copy <file-path>");
  console.log("      Copy the complete contents of a file to the clipboard.");
  console.log("");

  console.log("  search <query>");
  console.log("      Search the project and show matching files with line numbers.");
  console.log("");
}
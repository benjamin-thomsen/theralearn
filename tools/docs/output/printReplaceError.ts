export function printReplaceError(filePath: string): void {
  console.log("");
  console.log(`❌ Failed to prepare: ${filePath}`);
  console.log("The file could not be cleared and opened for replacement.");
  console.log("");
}
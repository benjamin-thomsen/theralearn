export function printEditError(filePath: string): void {
  console.log("");
  console.log(`❌ Failed to open: ${filePath}`);
  console.log("The file could not be prepared for editing.");
  console.log("");
}
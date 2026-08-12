export interface PrintFileOptions {
  filePath: string;
  content: string;
}

export function printFile(options: PrintFileOptions): void {
  console.log(`===== ${options.filePath} =====`);
  console.log(options.content);
}
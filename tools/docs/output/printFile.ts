export interface PrintFileOptions {
  filePath: string;
  content: string;
}

export function printFile(options: PrintFileOptions): string {
  const output = `===== ${options.filePath} =====\n${options.content}`;

  console.log(output);

  return output;
}
import { check } from "./commands/check";
import { copy } from "./commands/copy";
import { edit } from "./commands/edit";
import { file } from "./commands/file";
import { help } from "./commands/help";
import { replace } from "./commands/replace";
import { verify } from "./commands/verify";

function header(): void {
  console.log("TheraLearn Documentation Tool");
  console.log("Version: 0.1");
  console.log("Status : Foundation");
  console.log("==================================");
  console.log("");
}

function requireFilePath(command: string): string | null {
  const filePath = process.argv[3];

  if (!filePath) {
    console.error(`Missing file path for command: ${command}`);
    console.error(`Usage: ./scripts/dev ${command} <file-path>`);
    process.exitCode = 1;

    return null;
  }

  return filePath;
}

function main(): void {
  const command = process.argv[2];

  header();

  switch (command) {
    case undefined:
    case "help":
      help();
      break;

    case "check":
      check();
      break;

    case "verify":
      verify();
      break;

    case "file": {
      const filePath = requireFilePath(command);

      if (filePath) {
        file(filePath);
      }

      break;
    }

    case "edit": {
      const filePath = requireFilePath(command);

      if (filePath) {
        edit(filePath);
      }

      break;
    }

    case "replace": {
      const filePath = requireFilePath(command);

      if (filePath) {
        replace(filePath);
      }

      break;
    }

    case "copy": {
      const filePath = requireFilePath(command);

      if (filePath) {
        copy(filePath);
      }

      break;
    }

    default:
      console.error(`Unknown command: ${command}`);
      console.error("");
      help();
      process.exitCode = 1;
  }
}

main();
import { check } from "./commands/check";
import { checkpoint } from "./commands/checkpoint";
import { copy } from "./commands/copy";
import { edit } from "./commands/edit";
import { file } from "./commands/file";
import { help } from "./commands/help";
import { index } from "./commands/index";
import { patch } from "./commands/patch";
import { replace } from "./commands/replace";
import { search } from "./commands/search";
import { status } from "./commands/status";
import { verify } from "./commands/verify";
import { documentationConfig } from "./config/documentation-config";

function header(): void {
  const { name, version, status: toolStatus } =
    documentationConfig.tool;

  console.log(name);
  console.log(`Version: ${version}`);
  console.log(`Status : ${toolStatus}`);
  console.log("==================================");
  console.log("");
}

function requireArgument(
  command: string,
  argumentName: string,
  usageValue: string,
): string | null {
  const value = process.argv[3];

  if (!value) {
    console.error(`Missing ${argumentName} for command: ${command}`);
    console.error(`Usage: ./scripts/dev ${command} ${usageValue}`);
    process.exitCode = 1;

    return null;
  }

  return value;
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

    case "checkpoint":
      checkpoint();
      break;

    case "status":
      status();
      break;

    case "index":
      index();
      break;

    case "file": {
      const filePath = requireArgument(
        command,
        "file path",
        "<file-path>",
      );

      if (filePath) {
        file(filePath);
      }

      break;
    }

    case "edit": {
      const filePath = requireArgument(
        command,
        "file path",
        "<file-path>",
      );

      if (filePath) {
        edit(filePath);
      }

      break;
    }

    case "patch": {
      const filePath = requireArgument(
        command,
        "file path",
        "<file-path>",
      );

      if (filePath) {
        patch(filePath);
      }

      break;
    }

    case "replace": {
      const filePath = requireArgument(
        command,
        "file path",
        "<file-path>",
      );

      if (filePath) {
        replace(filePath);
      }

      break;
    }

    case "copy": {
      const filePath = requireArgument(
        command,
        "file path",
        "<file-path>",
      );

      if (filePath) {
        copy(filePath);
      }

      break;
    }

    case "search": {
      const query = requireArgument(
        command,
        "search query",
        "<query>",
      );

      if (query) {
        search(query);
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
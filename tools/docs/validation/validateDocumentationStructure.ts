import { REQUIRED_DIRECTORIES } from "../config/required-directories";
import { pathExists } from "../filesystem/exists";

export interface DocumentationStructureValidationResult {
  valid: boolean;
  existingDirectories: string[];
  missingDirectories: string[];
}

export function validateDocumentationStructure(): DocumentationStructureValidationResult {
  const existingDirectories: string[] = [];
  const missingDirectories: string[] = [];

  for (const directory of REQUIRED_DIRECTORIES) {
    if (pathExists(directory)) {
      existingDirectories.push(directory);
    } else {
      missingDirectories.push(directory);
    }
  }

  return {
    valid: missingDirectories.length === 0,
    existingDirectories,
    missingDirectories,
  };
}

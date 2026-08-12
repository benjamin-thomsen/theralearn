/**
 * Result returned from documentation structure validation.
 */
export interface CheckDocumentationStructureResult {
  valid: boolean;
  existingDirectories: string[];
  missingDirectories: string[];
}
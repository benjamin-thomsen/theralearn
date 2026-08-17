import type { BoundedPlainTextSourceDocument } from "./types";

export interface ExtractedSourceMaterial {
  text: string;
  sourceDocument: BoundedPlainTextSourceDocument;
}

export function extractSourceMaterial(
  sourceDocument: BoundedPlainTextSourceDocument,
): ExtractedSourceMaterial {
  return {
    text: sourceDocument.text,
    sourceDocument,
  };
}

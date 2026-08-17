import type { BoundedPlainTextSourceDocument } from "./types";

export interface SupportingSourceBoundary {
  startOffset: number;
  endOffset: number;
}

export interface ExtractedSourceMaterial {
  text: string;
  sourceDocument: BoundedPlainTextSourceDocument;
  fullSourceBoundary: SupportingSourceBoundary;
}

export function extractSourceMaterial(
  sourceDocument: BoundedPlainTextSourceDocument,
): ExtractedSourceMaterial {
  return {
    text: sourceDocument.text,
    sourceDocument,
    fullSourceBoundary: {
      startOffset: 0,
      endOffset: sourceDocument.text.length,
    },
  };
}

export interface BoundedPlainTextSourceDocument {
  kind: "plain-text";
  text: string;
}

export function createBoundedPlainTextSourceDocument(
  text: string,
): BoundedPlainTextSourceDocument {
  const normalizedText = text.trim();

  if (!normalizedText) {
    throw new Error(
      "Bounded plain-text source input requires non-empty text.",
    );
  }

  return {
    kind: "plain-text",
    text: normalizedText,
  };
}

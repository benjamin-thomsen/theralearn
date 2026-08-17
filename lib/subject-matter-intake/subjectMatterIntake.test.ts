import { describe, expect, it } from "vitest";

import { extractSourceMaterial } from "./extractSourceMaterial";
import { createBoundedPlainTextSourceDocument } from "./types";

describe("Subject-Matter Intake", () => {
  it("rejects empty plain-text source input", () => {
    expect(() => createBoundedPlainTextSourceDocument("   ")).toThrow(
      "Bounded plain-text source input requires non-empty text.",
    );
  });

  it("normalizes surrounding whitespace at the source-input boundary", () => {
    const sourceDocument = createBoundedPlainTextSourceDocument(
      "  Explicit subject matter.  ",
    );

    expect(sourceDocument).toEqual({
      kind: "plain-text",
      text: "Explicit subject matter.",
    });
  });

  it("extracts source material without changing the validated text", () => {
    const sourceDocument = createBoundedPlainTextSourceDocument(
      "The learner must be able to define mentalization.",
    );

    const extractedSourceMaterial = extractSourceMaterial(sourceDocument);

    expect(extractedSourceMaterial.text).toBe(sourceDocument.text);
    expect(extractedSourceMaterial.sourceDocument).toBe(sourceDocument);
  });
});

import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

import { createBoundedPlainTextSourceDocument } from "./types";
import type { BoundedPlainTextSourceDocument } from "./types";

export async function extractTextFromPdf(
  pdfBytes: Uint8Array,
): Promise<BoundedPlainTextSourceDocument> {
  if (pdfBytes.length === 0) {
    throw new Error("Text-based PDF extraction requires non-empty PDF data.");
  }

  const pdf = await getDocument({ data: pdfBytes }).promise.catch(() => {
    throw new Error("Text-based PDF extraction failed.");
  });

  const pageTexts: string[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .filter((item) => "str" in item)
      .map((item) => item.str)
      .join(" ")
      .trim();

    if (pageText) {
      pageTexts.push(pageText);
    }
  }

  const extractedText = pageTexts.join("\n").trim();

  if (!extractedText) {
    throw new Error(
      "Text-based PDF extraction requires machine-readable embedded text.",
    );
  }

  return createBoundedPlainTextSourceDocument(extractedText);
}

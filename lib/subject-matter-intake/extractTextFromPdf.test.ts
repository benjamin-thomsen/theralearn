import { describe, expect, it } from "vitest";

import { extractTextFromPdf } from "./extractTextFromPdf";

function createMinimalPdfBytes(text?: string): Uint8Array {
  const stream = text
    ? `BT /F1 12 Tf 72 720 Td (${text}) Tj ET`
    : "q Q";

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  for (const [index, body] of objects.entries()) {
    offsets.push(new TextEncoder().encode(pdf).length);
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  }

  const xrefOffset = new TextEncoder().encode(pdf).length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";

  for (const offset of offsets.slice(1)) {
    pdf += `${offset.toString().padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdf += `startxref\n${xrefOffset}\n%%EOF\n`;

  return new TextEncoder().encode(pdf);
}

describe("Text-based PDF extraction", () => {
  it("extracts machine-readable embedded text into bounded plain text", async () => {
    const sourceDocument = await extractTextFromPdf(
      createMinimalPdfBytes("Machine readable subject matter."),
    );

    expect(sourceDocument).toEqual({
      kind: "plain-text",
      text: "Machine readable subject matter.",
    });
  });

  it("rejects empty PDF input explicitly", async () => {
    await expect(extractTextFromPdf(new Uint8Array())).rejects.toThrow(
      "Text-based PDF extraction requires non-empty PDF data.",
    );
  });

  it("rejects a PDF without machine-readable embedded text", async () => {
    await expect(extractTextFromPdf(createMinimalPdfBytes())).rejects.toThrow(
      "Text-based PDF extraction requires machine-readable embedded text.",
    );
  });
});

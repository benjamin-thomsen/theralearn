import { afterEach, describe, expect, it, vi } from "vitest";

import { extractSourceMaterial } from "./extractSourceMaterial";
import { OpenAiObjectiveAnalysisProvider } from "./openAiObjectiveAnalysisProvider";
import { createBoundedPlainTextSourceDocument } from "./types";

const originalApiKey = process.env.OPENAI_API_KEY;

function createSourceMaterial() {
  return extractSourceMaterial(
    createBoundedPlainTextSourceDocument("Grounded source material."),
  );
}

afterEach(() => {
  vi.restoreAllMocks();

  if (originalApiKey === undefined) {
    delete process.env.OPENAI_API_KEY;
  } else {
    process.env.OPENAI_API_KEY = originalApiKey;
  }
});

describe("OpenAI objective-analysis provider", () => {
  it("fails explicitly when the API credential is missing", async () => {
    delete process.env.OPENAI_API_KEY;

    const provider = new OpenAiObjectiveAnalysisProvider();

    await expect(
      provider.analyzeObjective(createSourceMaterial()),
    ).rejects.toThrow("Objective analysis requires OPENAI_API_KEY.");
  });

  it("fails explicitly when the provider request fails", async () => {
    process.env.OPENAI_API_KEY = "test-key";
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("Provider failure", { status: 500 }),
    );

    const provider = new OpenAiObjectiveAnalysisProvider();

    await expect(
      provider.analyzeObjective(createSourceMaterial()),
    ).rejects.toThrow("Objective analysis provider request failed.");
  });

  it("fails explicitly when provider output is structurally invalid", async () => {
    process.env.OPENAI_API_KEY = "test-key";
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          output: [
            {
              content: [
                {
                  type: "output_text",
                  text: JSON.stringify({ statement: "Describe the source." }),
                },
              ],
            },
          ],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    const provider = new OpenAiObjectiveAnalysisProvider();

    await expect(
      provider.analyzeObjective(createSourceMaterial()),
    ).rejects.toThrow("Objective analysis provider returned invalid output.");
  });
});

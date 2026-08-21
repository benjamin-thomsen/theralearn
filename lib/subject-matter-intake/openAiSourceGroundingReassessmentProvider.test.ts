import { afterEach, describe, expect, it, vi } from "vitest";

import { extractSourceMaterial } from "./extractSourceMaterial";
import { changeObjectiveProposal, createObjectiveProposal } from "./objectiveProposal";
import { OpenAiSourceGroundingReassessmentProvider } from "./openAiSourceGroundingReassessmentProvider";
import { createBoundedPlainTextSourceDocument } from "./types";

const originalApiKey = process.env.OPENAI_API_KEY;

function createFixture() {
  const sourceMaterial = extractSourceMaterial(
    createBoundedPlainTextSourceDocument("Grounded source material."),
  );
  const proposal = createObjectiveProposal("Original objective.", {
    startOffset: 0,
    endOffset: sourceMaterial.text.length,
  });

  return {
    sourceMaterial,
    candidate: changeObjectiveProposal(proposal, "Changed objective."),
  };
}

function providerResponse(grounded: boolean) {
  return new Response(
    JSON.stringify({
      output: [{ content: [{ type: "output_text", text: JSON.stringify({ grounded }) }] }],
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
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

describe("OpenAI source-grounding reassessment provider", () => {
  it("produces reassessment only after positive semantic grounding", async () => {
    process.env.OPENAI_API_KEY = "test-key";
    vi.spyOn(globalThis, "fetch").mockResolvedValue(providerResponse(true));
    const { candidate, sourceMaterial } = createFixture();

    await expect(
      new OpenAiSourceGroundingReassessmentProvider().reassessSourceGrounding(
        candidate,
        sourceMaterial,
      ),
    ).resolves.toEqual({ sourceGroundingReassessed: true });
  });

  it("fails without producing reassessment when semantic grounding is negative", async () => {
    process.env.OPENAI_API_KEY = "test-key";
    vi.spyOn(globalThis, "fetch").mockResolvedValue(providerResponse(false));
    const { candidate, sourceMaterial } = createFixture();

    await expect(
      new OpenAiSourceGroundingReassessmentProvider().reassessSourceGrounding(
        candidate,
        sourceMaterial,
      ),
    ).rejects.toThrow("Source-grounding reassessment found the objective is not grounded.");
  });

  it("fails explicitly when the API credential is missing", async () => {
    delete process.env.OPENAI_API_KEY;
    const { candidate, sourceMaterial } = createFixture();

    await expect(
      new OpenAiSourceGroundingReassessmentProvider().reassessSourceGrounding(
        candidate,
        sourceMaterial,
      ),
    ).rejects.toThrow("Source-grounding reassessment requires OPENAI_API_KEY.");
  });

  it("fails explicitly when the provider request fails", async () => {
    process.env.OPENAI_API_KEY = "test-key";
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("Provider failure", { status: 500 }),
    );
    const { candidate, sourceMaterial } = createFixture();

    await expect(
      new OpenAiSourceGroundingReassessmentProvider().reassessSourceGrounding(
        candidate,
        sourceMaterial,
      ),
    ).rejects.toThrow("Source-grounding reassessment provider request failed.");
  });

  it("fails explicitly when provider output is invalid", async () => {
    process.env.OPENAI_API_KEY = "test-key";
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          output: [
            {
              content: [
                {
                  type: "output_text",
                  text: JSON.stringify({ grounded: "yes" }),
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
    const { candidate, sourceMaterial } = createFixture();

    await expect(
      new OpenAiSourceGroundingReassessmentProvider().reassessSourceGrounding(
        candidate,
        sourceMaterial,
      ),
    ).rejects.toThrow("Source-grounding reassessment provider returned invalid output.");
  });
});


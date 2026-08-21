import type { ExtractedSourceMaterial } from "./extractSourceMaterial";
import type {
  CreatorControlledObjectiveCandidate,
  SourceGroundingReassessment,
} from "./objectiveProposal";
import type { SourceGroundingReassessmentProvider } from "./sourceGroundingReassessment";

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const OPENAI_MODEL = "gpt-5.6";

interface OpenAiResponsesApiResponse {
  output?: Array<{
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
}

interface OpenAiSourceGroundingPayload {
  grounded: boolean;
}

export class OpenAiSourceGroundingReassessmentProvider
  implements SourceGroundingReassessmentProvider
{
  async reassessSourceGrounding(
    candidate: CreatorControlledObjectiveCandidate,
    sourceMaterial: ExtractedSourceMaterial,
  ): Promise<SourceGroundingReassessment> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("Source-grounding reassessment requires OPENAI_API_KEY.");
    }

    const { startOffset, endOffset } = candidate.supportingSourceBoundary;
    const supportingSource = sourceMaterial.text.slice(startOffset, endOffset);

    const response = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        input: [
          {
            role: "system",
            content:
              "Determine whether the learning objective is meaningfully supported by the supplied supporting source material. Return JSON only with exactly one boolean field named grounded.",
          },
          {
            role: "user",
            content: JSON.stringify({
              objective: candidate.statement,
              supportingSource,
            }),
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Source-grounding reassessment provider request failed.");
    }

    const responseBody = (await response.json()) as OpenAiResponsesApiResponse;
    const text = responseBody.output
      ?.flatMap(item => item.content ?? [])
      .find(content => content.type === "output_text")
      ?.text;

    if (!text) {
      throw new Error("Source-grounding reassessment provider returned no usable output.");
    }

    let payload: OpenAiSourceGroundingPayload;

    try {
      payload = JSON.parse(text) as OpenAiSourceGroundingPayload;
    } catch {
      throw new Error("Source-grounding reassessment provider returned invalid output.");
    }

    if (typeof payload.grounded !== "boolean") {
      throw new Error("Source-grounding reassessment provider returned invalid output.");
    }

    if (!payload.grounded) {
      throw new Error("Source-grounding reassessment found the objective is not grounded.");
    }

    return { sourceGroundingReassessed: true };
  }
}


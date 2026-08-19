import type {
  ObjectiveAnalysisCandidate,
  ObjectiveAnalysisProvider,
} from "./objectiveAnalysis";
import type { ExtractedSourceMaterial } from "./extractSourceMaterial";

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

interface OpenAiObjectiveAnalysisPayload {
  statement: string;
  supportingSourceBoundary: {
    startOffset: number;
    endOffset: number;
  };
}

export class OpenAiObjectiveAnalysisProvider
  implements ObjectiveAnalysisProvider
{
  async analyzeObjective(
    sourceMaterial: ExtractedSourceMaterial,
  ): Promise<ObjectiveAnalysisCandidate> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("Objective analysis requires OPENAI_API_KEY.");
    }

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
              "Propose exactly one concise learning objective grounded only in the supplied source material. Return JSON only with statement, supportingSourceBoundary.startOffset, and supportingSourceBoundary.endOffset. The offsets must identify the supporting character range in the supplied source text.",
          },
          {
            role: "user",
            content: sourceMaterial.text,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Objective analysis provider request failed.");
    }

    const responseBody =
      (await response.json()) as OpenAiResponsesApiResponse;

    const text = responseBody.output
      ?.flatMap(item => item.content ?? [])
      .find(content => content.type === "output_text")
      ?.text;

    if (!text) {
      throw new Error("Objective analysis provider returned no usable output.");
    }

    let payload: OpenAiObjectiveAnalysisPayload;

    try {
      payload = JSON.parse(text) as OpenAiObjectiveAnalysisPayload;
    } catch {
      throw new Error("Objective analysis provider returned invalid output.");
    }

    if (
      typeof payload.statement !== "string" ||
      !payload.supportingSourceBoundary ||
      typeof payload.supportingSourceBoundary.startOffset !== "number" ||
      typeof payload.supportingSourceBoundary.endOffset !== "number"
    ) {
      throw new Error("Objective analysis provider returned invalid output.");
    }

    return {
      statement: payload.statement,
      supportingSourceBoundary: payload.supportingSourceBoundary,
    };
  }
}

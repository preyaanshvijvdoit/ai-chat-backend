import OpenAI from "openai";

import { env } from "../config/env";
import {
  AiMessage,
  AiProvider,
  AiResponse,
} from "./ai-provider";

/**
 * Groq implementation of the AI provider.
 */
export class GroqProvider implements AiProvider {
  /**
   * OpenAI client configured to communicate
   * with the Groq API.
   */
  private readonly client = new OpenAI({
    apiKey: env.AI_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  });

  /**
   * Generates an AI response.
   */
  async generateResponse(
    messages: AiMessage[]
  ): Promise<AiResponse> {

    console.log("Messages being sent:", messages);
    console.log(
    "Total characters:",
    JSON.stringify(messages).length
    );
    const response =
      await this.client.chat.completions.create({
        model: env.AI_MODEL,
        messages,
      });

    return {
      content:
        response.choices[0]?.message.content ?? "",

      inputTokens:
        response.usage?.prompt_tokens,

      outputTokens:
        response.usage?.completion_tokens,

      finishReason:
        response.choices[0]?.finish_reason ?? undefined,
        
    };
  }

    /**
     * Streams an AI response.
     */
    async streamResponse(
    messages: AiMessage[],
    onToken: (token: string) => void
    ): Promise<AiResponse> {

    const stream =
        await this.client.chat.completions.create({
        model: env.AI_MODEL,
        messages,
        stream: true,
        });

    let fullResponse = "";

    for await (const chunk of stream) {

        const token =
        chunk.choices[0]?.delta?.content ?? "";

        if (!token) {
        continue;
        }

        fullResponse += token;

        onToken(token);
    }

    return {
        content: fullResponse,
        inputTokens: undefined,
        outputTokens: undefined,
        finishReason: "stop",
    };
    }
}
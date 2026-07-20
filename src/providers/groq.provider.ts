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
}
import { env } from "../config/env";

import {
  AiMessage,
  AiProvider,
  AiResponse,
} from "../providers/ai-provider";
import { GroqProvider } from "../providers/groq.provider";

/**
 * Creates the configured AI provider.
 */
const createProvider = (): AiProvider => {
  switch (env.AI_PROVIDER.toLowerCase()) {
    case "groq":
      return new GroqProvider();

    default:
      throw new Error(
        `Unsupported AI provider: ${env.AI_PROVIDER}`
      );
  }
};

/**
 * Singleton AI provider instance.
 */
const provider = createProvider();

/**
 * Service responsible for interacting with
 * the configured AI provider.
 */
export const aiService = {
  /**
   * Generates an AI response.
   */
  async generateResponse(
    messages: AiMessage[]
  ): Promise<AiResponse> {
    return provider.generateResponse(messages);
  },

    /**
     * Streams an AI response.
     */
    async streamResponse(
    messages: AiMessage[],
    onToken: (token: string) => void
    ): Promise<AiResponse> {
    return provider.streamResponse(
        messages,
        onToken
    );
    },
};
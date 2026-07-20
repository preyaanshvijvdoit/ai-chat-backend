/**
 * Standardized message format used throughout the application.
 *
 * Every AI provider receives messages in this format.
 * Individual providers are responsible for converting it
 * into the format required by their own APIs.
 */
export interface AiMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * Standardized AI response returned by every provider.
 *
 * Different providers expose different metadata, so this
 * interface normalizes the response for the rest of the
 * application.
 */
export interface AiResponse {
  /**
   * The generated response from the AI model.
   */
  content: string;

  /**
   * Number of input tokens consumed.
   * May be undefined if the provider does not expose it.
   */
  inputTokens?: number;

  /**
   * Number of output tokens generated.
   * May be undefined if the provider does not expose it.
   */
  outputTokens?: number;

  /**
   * Reason why generation stopped.
   * Examples:
   * - stop
   * - length
   * - content_filter
   */
  finishReason?: string;
}

/**
 * Represents any AI provider supported by the application.
 *
 * Every provider (Groq, OpenAI, Gemini, etc.)
 * must implement this interface.
 */
export interface AiProvider {
  generateResponse(
    messages: AiMessage[]
  ): Promise<AiResponse>;

  streamResponse(
    messages: AiMessage[],
    onToken: (token: string) => void
  ): Promise<AiResponse>;
}
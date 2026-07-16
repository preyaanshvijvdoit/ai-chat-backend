import { MessageRole } from "../generated/prisma/enums";
import { AiMessage } from "../providers/ai-provider";

/**
 * Represents the minimum information required
 * from a database message to build AI context.
 */
interface ContextMessage {
  role: MessageRole;
  content: string;
}

/**
 * Service responsible for converting database
 * messages into AI-ready conversation context.
 */
export const contextService = {
  /**
   * Builds conversation history for the AI provider.
   */
  buildContext(
    messages: ContextMessage[]
  ): AiMessage[] {
    return messages.map((message) => ({
      role: this.mapRole(message.role),
      content: message.content,
    }));
  },

  /**
   * Converts database message roles into
   * standardized AI roles.
   */
  mapRole(role: MessageRole): AiMessage["role"] {
    switch (role) {
      case MessageRole.USER:
        return "user";

      case MessageRole.ASSISTANT:
        return "assistant";

      case MessageRole.SYSTEM:
        return "system";
    }
  },
};
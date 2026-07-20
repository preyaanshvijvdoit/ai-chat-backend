/**
 * Data required when a user sends a message.
 */
export interface SendMessageDto {
  content?: string;
}

/**
 * Route parameters for message endpoints.
 */
export interface MessageParams {
  chatId: string;
}

/**
 * Query parameters used for cursor pagination.
 */
export interface GetMessagesQueryDto {
  cursor?: string;
  limit?: number;
}

/**
 * Message returned to the client.
 */
export interface MessageResponseDto {
  id: string;
  role: string;
  content: string;
  createdAt: Date;
}

/**
 * Response returned after sending a message.
 */
export interface SendMessageResponseDto {
  userMessage: MessageResponseDto;
  assistantMessage: MessageResponseDto;
}
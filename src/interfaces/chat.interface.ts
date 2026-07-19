/**
 * Data required to create a new chat.
 */
export interface CreateChatDto {
  title?: string;
}

/**
 * Data required to rename a chat.
 */
export interface RenameChatDto {
  title: string;
}

/**
 * Chat returned to the client.
 */
export interface ChatResponseDto {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Data required to rename a chat.
 */
export interface RenameChatDto {
  title: string;
}

/**
 * Chat returned to the client.
 */
export interface ChatResponseDto {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Cursor pagination metadata.
 */
export interface GetChatsQueryDto {
  cursor?: string;
  limit?: number;
}

/**
 * Route parameters for endpoints that require a chat ID.
 */
export interface ChatParams {
  chatId: string;
}

/**
 * Query parameters used for searching chats.
 */
export interface SearchChatsDto {
  q: string;
}
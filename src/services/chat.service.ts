import { getAuthorizedChat } from "../helpers/chat.helper";
import {
  ChatResponseDto,
  CreateChatDto,
  RenameChatDto,
} from "../interfaces/chat.interface";
import { chatRepository } from "../repositories/chat.repository";

/**
 * Converts a database Chat object into the DTO
 * returned to the client.
 */
const toChatResponseDto = (
  chat: {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
  }
): ChatResponseDto => ({
  id: chat.id,
  title: chat.title,
  createdAt: chat.createdAt,
  updatedAt: chat.updatedAt,
});


/**
 * Service responsible for chat-related business logic.
 */
export const chatService = {
  /**
   * Creates a new chat.
   */
  async createChat(
    userId: string,
    data: CreateChatDto
  ): Promise<ChatResponseDto> {
    const chat = await chatRepository.create(
      userId,
      data.title
    );

    return toChatResponseDto(chat);
  },

  /**
   * Returns all chats belonging to the authenticated user.
   */
  async getChats(
    userId: string
  ): Promise<ChatResponseDto[]> {
    const chats = await chatRepository.findManyByUserId(
      userId
    );

    return chats.map(toChatResponseDto);
  },

  /**
   * Returns a single chat.
   */
  async getChatById(
    chatId: string,
    userId: string
  ): Promise<ChatResponseDto> {
    const chat = await getAuthorizedChat(
      chatId,
      userId
    );

    return toChatResponseDto(chat);
  },

  /**
   * Renames a chat.
   */
  async renameChat(
    chatId: string,
    userId: string,
    data: RenameChatDto
  ): Promise<ChatResponseDto> {
    // Ensure the user owns this chat.
    await getAuthorizedChat(chatId, userId);

    const updatedChat =
      await chatRepository.updateTitle(
        chatId,
        data.title
      );

    return toChatResponseDto(updatedChat);
  },

  /**
   * Soft deletes a chat.
   */
  async deleteChat(
    chatId: string,
    userId: string
  ): Promise<void> {
    // Ensure the user owns this chat.
    await getAuthorizedChat(chatId, userId);

    await chatRepository.softDelete(chatId);
  },
};
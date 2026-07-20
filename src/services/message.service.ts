import { prisma } from "../lib/prisma";
import { MessageRole } from "../generated/prisma/enums";

import { aiService } from "./ai.service";
import { contextService } from "./context.service";
import { getAuthorizedChat } from "../helpers/chat.helper";

import { chatRepository } from "../repositories/chat.repository";
import { messageRepository } from "../repositories/message.repository";

import {
  MessageResponseDto,
  SendMessageDto,
  SendMessageResponseDto,
} from "../interfaces/message.interface";

import { fileService } from "./file.service";

import { AppError } from "../utils/app-error";
import { HTTP_STATUS } from "../constants/http-status";

/**
 * Converts a database Message object into
 * the DTO returned to the client.
 */
const toMessageResponseDto = (
  message: {
    id: string;
    role: MessageRole;
    content: string;
    createdAt: Date;
  }
): MessageResponseDto => ({
  id: message.id,
  role: message.role,
  content: message.content,
  createdAt: message.createdAt,
});

/**
 * Service responsible for message-related
 * business logic.
 */
export const messageService = {
  /**
   * Sends a message to the AI.
   */
  async sendMessage(
    chatId: string,
    userId: string,
    data: SendMessageDto,
    file?: Express.Multer.File
  ): Promise<SendMessageResponseDto> {
    /**
     * Ensure the authenticated user owns the chat.
     */
    await getAuthorizedChat(chatId, userId);

    /**
     * Require either a message or a file.
     */
    if (!data.content && !file) {
        throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        "Either a message or a file is required."
        );
    }

    /**
     * Extract uploaded file text.
     */
    let extractedText = "";

    if (file) {
    extractedText =
        await fileService.extractText(
        file.path,
        file.mimetype
        );

    await fileService.deleteFile(
        file.path
    );
    }

    /**
     * Build the final prompt.
     */
    const finalPrompt = [
    data.content,
    extractedText &&
        `\n\nAttached Document:\n${extractedText}`,
    ]
    .filter(Boolean)
    .join("");

    /**
     * Save the user's message.
     */
    const userMessage = await messageRepository.create(
      chatId,
      MessageRole.USER,
      finalPrompt
    );

    /**
     * Load the complete conversation history.
     */
    const messages =
      await messageRepository.findByChatId(chatId);

    /**
     * Build AI context.
     */
    const context =
      contextService.buildContext(messages);

    /**
     * Generate an AI response.
     */
    const aiResponse =
      await aiService.generateResponse(context);

    /**
     * Save the assistant message and update the
     * chat timestamp atomically.
     */
    const assistantMessage =
      await prisma.$transaction(async (tx) => {

        const message =
          await messageRepository.create(
            chatId,
            MessageRole.ASSISTANT,
            aiResponse.content,
            tx
          );

        await chatRepository.touch(
          chatId,
          tx
        );

        return message;
      });

    return {
      userMessage:
        toMessageResponseDto(userMessage),

      assistantMessage:
        toMessageResponseDto(assistantMessage),
    };
  },

  /**
   * Streams a message to the AI.
   */
    async streamMessage(
    chatId: string,
    userId: string,
    data: SendMessageDto,
    onToken: (token: string) => void,
    file?: Express.Multer.File
    ): Promise<void> {
    /**
     * Ensure the authenticated user owns the chat.
     */
    await getAuthorizedChat(chatId, userId);

    /**
     * Require either a message or a file.
     */
    if (!data.content && !file) {
        throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        "Either a message or a file is required."
        );
    }

    /**
     * Extract uploaded file text.
     */
    let extractedText = "";

    if (file) {
    extractedText =
        await fileService.extractText(
        file.path,
        file.mimetype
        );

    await fileService.deleteFile(
        file.path
    );
    }

    /**
     * Build the final prompt.
     */
    const finalPrompt = [
    data.content,
    extractedText &&
        `\n\nAttached Document:\n${extractedText}`,
    ]
    .filter(Boolean)
    .join("");

    /**
     * Save the user's message.
     */
    await messageRepository.create(
    chatId,
    MessageRole.USER,
    finalPrompt
    );

    /**
     * Load the complete conversation history.
     */
    const messages =
      await messageRepository.findByChatId(chatId);

    /**
     * Build AI context.
     */
    const context =
      contextService.buildContext(messages);

    /**
     * Generate an AI response.
     */
    const aiResponse =
    await aiService.streamResponse(
        context,
        onToken
    );

    /**
     * Save the assistant message and update the
     * chat timestamp atomically.
     */
    const assistantMessage =
    await prisma.$transaction(async (tx) => {

    await messageRepository.create(
        chatId,
        MessageRole.ASSISTANT,
        aiResponse.content,
        tx
    );

    await chatRepository.touch(
        chatId,
        tx
    );
    });

  },

  /**
   * Returns every message belonging to a chat.
   */
  async getMessages(
    chatId: string,
    userId: string
  ): Promise<MessageResponseDto[]> {

    await getAuthorizedChat(chatId, userId);

    const messages =
      await messageRepository.findByChatId(chatId);

    return messages.map(
      toMessageResponseDto
    );
  },
};
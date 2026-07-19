import { Request, Response } from "express";

import { HTTP_STATUS } from "../constants/http-status";
import {
  CreateChatDto,
  RenameChatDto,
} from "../interfaces/chat.interface";
import { chatService } from "../services/chat.service";
import { asyncHandler } from "../utils/async-handler";
import { sendSuccessResponse } from "../utils/api-response";


/**
 * Chat controller.
 */
export const chatController = {
  /**
   * Create a new chat.
   */
  createChat: asyncHandler(async (req: Request, res: Response) => {
    const chat = await chatService.createChat(
      req.user!.userId,
      req.body as CreateChatDto
    );

    return sendSuccessResponse(
      res,
      HTTP_STATUS.CREATED,
      "Chat created successfully.",
      chat
    );
  }),

  /**
   * Get all chats for the authenticated user.
   */
  getChats: asyncHandler(async (req: Request, res: Response) => {
    const chats = await chatService.getChats(
      req.user!.userId
    );

    return sendSuccessResponse(
      res,
      HTTP_STATUS.OK,
      "Chats fetched successfully.",
      chats
    );
  }),

  /**
   * Get a single chat.
   */
  getChatById: asyncHandler(async (req: Request, res: Response) => {
    const chat = await chatService.getChatById(
      req.params.chatId as string,
      req.user!.userId
    );

    return sendSuccessResponse(
      res,
      HTTP_STATUS.OK,
      "Chat fetched successfully.",
      chat
    );
  }),

  /**
   * Rename a chat.
   */
  renameChat: asyncHandler(async (req: Request, res: Response) => {
    const chat = await chatService.renameChat(
      req.params.chatId as string,
      req.user!.userId,
      req.body as RenameChatDto
    );

    return sendSuccessResponse(
      res,
      HTTP_STATUS.OK,
      "Chat renamed successfully.",
      chat
    );
  }),

  /**
   * Soft delete a chat.
   */
  deleteChat: asyncHandler(async (req: Request, res: Response) => {
    await chatService.deleteChat(
      req.params.chatId as string,
      req.user!.userId
    );

    return sendSuccessResponse(
      res,
      HTTP_STATUS.OK,
      "Chat deleted successfully."
    );
  }),

    /**
     * Search chats by title.
     */
    searchChats: asyncHandler(async (req: Request, res: Response) => {
    const chats = await chatService.searchChats(
        req.user!.userId,
        req.query.q as string
    );

    return sendSuccessResponse(
        res,
        HTTP_STATUS.OK,
        "Chats fetched successfully.",
        chats
    );
    }),
};
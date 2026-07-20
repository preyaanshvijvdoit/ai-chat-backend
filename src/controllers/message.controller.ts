import { Request, Response } from "express";

import { HTTP_STATUS } from "../constants/http-status";
import { SendMessageDto } from "../interfaces/message.interface";
import { messageService } from "../services/message.service";
import { asyncHandler } from "../utils/async-handler";
import { sendSuccessResponse } from "../utils/api-response";

/**
 * Message controller.
 */
export const messageController = {
    /**
     * Send a new message.
     */
    sendMessage: asyncHandler(async (req: Request, res: Response) => {
    const message = await messageService.sendMessage(
        req.params.chatId as string,
        req.user!.userId,
        req.body as SendMessageDto,
        req.file
    );

    return sendSuccessResponse(
        res,
        HTTP_STATUS.CREATED,
        "Message sent successfully.",
        message
    );
    }),

  /**
   * Fetch all messages for a chat.
   */
  getMessages: asyncHandler(async (req: Request, res: Response) => {
    const messages = await messageService.getMessages(
      req.params.chatId as string,
      req.user!.userId
    );

    return sendSuccessResponse(
      res,
      HTTP_STATUS.OK,
      "Messages fetched successfully.",
      messages
    );
  }),

    /**
     * Streams an AI response.
     */
    streamMessage: asyncHandler(
    async (req: Request, res: Response) => {

        res.setHeader(
        "Content-Type",
        "text/event-stream"
        );

        res.setHeader(
        "Cache-Control",
        "no-cache"
        );

        res.setHeader(
        "Connection",
        "keep-alive"
        );

        res.flushHeaders();

        await messageService.streamMessage(
        req.params.chatId as string,
        req.user!.userId,
        req.body as SendMessageDto,
        (token) => {
            res.write(
            `data: ${JSON.stringify({
                token,
            })}\n\n`
            );
        },
        req.file
        );

        res.write(
        `data: ${JSON.stringify({
            done: true,
        })}\n\n`
        );

        res.end();
    }
    ),
};
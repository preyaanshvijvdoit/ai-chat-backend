import { Router } from "express";

import { chatController } from "../controllers/chat.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createChatSchema,
  renameChatSchema,
  chatIdParamSchema,
} from "../validators/chat.validator";

import messageRoutes from "./message.routes";

const router = Router();

/**
 * Create a new chat.
 */
router.post(
  "/",
  authenticate,
  validate(createChatSchema),
  chatController.createChat
);

/**
 * Get all chats for the authenticated user.
 */
router.get(
  "/",
  authenticate,
  chatController.getChats
);

/**
 * Get a single chat.
 */
router.get(
  "/:chatId",
  authenticate,
  validate(chatIdParamSchema, "params"),
  chatController.getChatById
);

/**
 * Rename a chat.
 */
router.patch(
  "/:chatId",
  authenticate,
  validate(chatIdParamSchema, "params"),
  validate(renameChatSchema),
  chatController.renameChat
);

/**
 * Soft delete a chat.
 */
router.delete(
  "/:chatId",
  authenticate,
  validate(chatIdParamSchema, "params"),
  chatController.deleteChat
);

/**
 * Message routes.
 *
 * Authentication and chat ID validation are applied once
 * here for every nested message endpoint.
 */
router.use(
  "/:chatId/messages",
  authenticate,
  validate(chatIdParamSchema, "params"),
  messageRoutes
);

export default router;
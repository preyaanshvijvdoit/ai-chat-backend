import { Router } from "express";

import { messageController } from "../controllers/message.controller";
import { validate } from "../middlewares/validation.middleware";
import {
  sendMessageSchema,
  getMessagesQuerySchema,
} from "../validators/message.validator";

/**
 * Merge parent route parameters.
 *
 * Without mergeParams, req.params.chatId from
 * /chat/:chatId/messages would not be available.
 */
const router = Router({
  mergeParams: true,
});

/**
 * Send a message.
 */
router.post(
  "/",
  validate(sendMessageSchema),
  messageController.sendMessage
);

/**
 * Get chat messages.
 */
router.get(
  "/",
  validate(getMessagesQuerySchema, "query"),
  messageController.getMessages
);

export default router;
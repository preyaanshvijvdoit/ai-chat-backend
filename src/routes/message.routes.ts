import { Router } from "express";

import { messageController } from "../controllers/message.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  chatIdParamSchema,
} from "../validators/chat.validator";
import {
  sendMessageSchema,
} from "../validators/message.validator";

const router = Router({ mergeParams: true });

/**
 * Send a message.
 */
router.post(
  "/",
  authenticate,
  validate(chatIdParamSchema, "params"),
  validate(sendMessageSchema),
  messageController.sendMessage
);

/**
 * Get chat messages.
 */
router.get(
  "/",
  authenticate,
  validate(chatIdParamSchema, "params"),
  messageController.getMessages
);

export default router;
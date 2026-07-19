import { z } from "zod";
import { CHAT_TITLE_MAX_LENGTH } from "../constants/validation";

/**
 * Validation schema for creating a new chat.
 *
 * The title is optional because if the frontend does not provide one,
 * the database automatically assigns the default title ("New Chat").
 */
export const createChatSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title cannot be empty.")
    .max(CHAT_TITLE_MAX_LENGTH, "Title cannot exceed 100 characters.")
    .optional(),
});

/**
 * Validation schema for renaming an existing chat.
 *
 * Unlike chat creation, renaming always requires a valid title.
 */
export const renameChatSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title cannot be empty.")
    .max(CHAT_TITLE_MAX_LENGTH, "Title cannot exceed 100 characters."),
});

/**
 * Validation schema for chat route parameters.
 *
 * Ensures the provided chat ID is a valid UUID before
 * the request reaches the controller.
 */
export const chatIdParamSchema = z.object({
  chatId: z.uuid("Invalid chat ID."),
});

/**
 * Validation schema for searching chats.
 */
export const searchChatsSchema = z.object({
  q: z
    .string()
    .trim()
    .min(1, "Search query is required.")
    .max(100, "Search query cannot exceed 100 characters."),
});
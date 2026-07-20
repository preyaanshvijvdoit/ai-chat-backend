import { z } from "zod";

/**
 * Validation schema for sending a message.
 */
export const sendMessageSchema = z.object({
  content: z
    .string()
    .trim()
    .max(10000, "Message cannot exceed 10000 characters.")
    .optional(),
});

/**
 * Validation schema for fetching paginated messages.
 */
export const getMessagesQuerySchema = z.object({
  cursor: z.string().uuid().optional(),

  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .default(20),
});
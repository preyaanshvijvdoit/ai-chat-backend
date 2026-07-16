import { HTTP_STATUS } from "../constants/http-status";
import { chatRepository } from "../repositories/chat.repository";
import { AppError } from "../utils/app-error";

/**
 * Returns a chat only if it belongs to the authenticated user.
 */
export const getAuthorizedChat = async (
  chatId: string,
  userId: string
) => {
  const chat = await chatRepository.findByIdAndUserId(
    chatId,
    userId
  );

  if (!chat) {
    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      "Chat not found."
    );
  }

  return chat;
};
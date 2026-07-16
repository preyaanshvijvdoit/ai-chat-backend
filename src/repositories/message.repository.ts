import { MessageRole } from "../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import { PrismaDbClient } from "../types/prisma.type";

/**
 * Repository responsible for all message-related
 * database operations.
 *
 * This layer ONLY communicates with the database.
 * It should never contain business logic.
 */
export const messageRepository = {
  /**
   * Creates a new message.
   */
    create(
    chatId: string,
    role: MessageRole,
    content: string,
    client: PrismaDbClient = prisma
    ) {
    return client.message.create({
      data: {
        chatId,
        role,
        content,
      },
      select: {
        id: true,
        role: true,
        content: true,
        createdAt: true,
      },
    });
  },

  /**
   * Returns every message belonging to a chat.
   *
   * Messages are ordered chronologically so the
   * conversation reads naturally.
   */
  findByChatId(chatId: string) {
    return prisma.message.findMany({
      where: {
        chatId,
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        role: true,
        content: true,
        createdAt: true,
      },
    });
  },

  /**
   * Returns messages using cursor pagination.
   */
  findByChatIdWithCursor(
    chatId: string,
    cursor?: string,
    limit = 20
  ) {
    return prisma.message.findMany({
      where: {
        chatId,
      },

      orderBy: {
        createdAt: "asc",
      },

      take: limit,

      ...(cursor && {
        skip: 1,
        cursor: {
          id: cursor,
        },
      }),

      select: {
        id: true,
        role: true,
        content: true,
        createdAt: true,
      },
    });
  },
};
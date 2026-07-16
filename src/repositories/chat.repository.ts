import { prisma } from "../lib/prisma";
import { PrismaDbClient } from "../types/prisma.type";

/**
 * Repository responsible for all chat-related database operations.
 *
 * This layer ONLY communicates with the database.
 * It should never contain business logic.
 */
export const chatRepository = {
    /**
     * Creates a new chat for a user.
     */
    create(userId: string, title?: string) {
        return prisma.chat.create({
        data: {
            userId,
            ...(title && { title }),
        },
        select: {
            id: true,
            title: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
            deletedAt: true,
        },
        });
    },

    /**
     * Returns all chats belonging to a user.
     *
     * Only active (non-deleted) chats are returned.
     * Most recently updated chats appear first.
     */
    findManyByUserId(userId: string) {
        return prisma.chat.findMany({
        where: {
            userId,
            deletedAt: null,
        },
        orderBy: {
            updatedAt: "desc",
        },
        select: {
            id: true,
            title: true,
            createdAt: true,
            updatedAt: true,
        },
        });
    },

    /**
     * Finds a chat that belongs to a specific user.
     *
     * This method also ensures soft-deleted chats
     * cannot be accessed.
     */
    findByIdAndUserId(
        chatId: string,
        userId: string
    ) {
        return prisma.chat.findFirst({
        where: {
            id: chatId,
            userId,
            deletedAt: null,
        },
        select: {
            id: true,
            title: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
            deletedAt: true,
        },
        });
    },

    /**
     * Updates the title of a chat.
     */
    updateTitle(
        chatId: string,
        title: string
    ) {
        return prisma.chat.update({
        where: {
            id: chatId,
        },
        data: {
            title,
        },
        select: {
            id: true,
            title: true,
            createdAt: true,
            updatedAt: true,
        },
        });
    },

    /**
     * Soft deletes a chat.
     */
    softDelete(chatId: string) {
        return prisma.chat.update({
        where: {
            id: chatId,
        },
        data: {
            deletedAt: new Date(),
        },
        });
    },

    /**
     * Updates a chat's last activity timestamp.
     */
    touch(
    chatId: string,
    client: PrismaDbClient = prisma
    ) {
    return client.chat.update({
        where: {
        id: chatId,
        },
        data: {
        updatedAt: new Date(),
        },
        select: {
        id: true,
        },
    });
    },
};
import { prisma } from "../lib/prisma";

/**
 * Repository responsible for user-related database operations.
 */
export const userRepository = {
  /**
   * Find a user by ID.
   */
  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  },

};
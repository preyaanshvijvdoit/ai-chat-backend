import { prisma } from "../lib/prisma";

/**
 * Repository responsible for password reset tokens.
 */
export const passwordResetRepository = {
  /**
   * Create or replace a password reset token.
   */
  async createToken(
    userId: string,
    token: string,
    expiresAt: Date
  ) {
    return prisma.passwordResetToken.upsert({
      where: {
        userId,
      },
      update: {
        token,
        expiresAt,
      },
      create: {
        userId,
        token,
        expiresAt,
      },
    });
  },

  /**
   * Find a password reset token.
   */
  async findByToken(token: string) {
    return prisma.passwordResetToken.findUnique({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });
  },

  /**
   * Delete a password reset token.
   */
  async deleteByUserId(userId: string) {
    return prisma.passwordResetToken.delete({
      where: {
        userId,
      },
    });
  },

  /**
   * Find a password reset token by user ID.
   */
  async findByUserId(userId: string) {
    return prisma.passwordResetToken.findUnique({
      where: {
        userId,
      },
    });
  },

    /**
     * Updates the user's password and deletes
     * the reset token in a single transaction.
     */
    async completePasswordReset(
    userId: string,
    hashedPassword: string
    ) {
    return prisma.$transaction([
        prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            password: hashedPassword,
        },
        }),

        prisma.passwordResetToken.delete({
        where: {
            userId,
        },
        }),
    ]);
    },
};
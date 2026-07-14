import { prisma } from "../lib/prisma";

/**
 * Repository responsible for email verification tokens.
 */
export const emailVerificationRepository = {
  /**
   * Create or replace a verification token.
   */
  async createToken(
    userId: string,
    token: string,
    expiresAt: Date
  ) {
    return prisma.emailVerificationToken.upsert({
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
   * Find verification token.
   */
  async findByToken(token: string) {
    return prisma.emailVerificationToken.findUnique({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });
  },

    async completeEmailVerification(userId: string) {
    return prisma.$transaction([
        prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            isVerified: true,
        },
        }),

        prisma.emailVerificationToken.delete({
        where: {
            userId,
        },
        }),
    ]);
    },

    /**
     * Find verification token by user ID.
     */
    async findByUserId(userId: string) {
      return prisma.emailVerificationToken.findUnique({
        where: {
          userId,
        },
      });
    },
};
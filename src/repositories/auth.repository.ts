import { prisma } from "../lib/prisma";
import { RegisterUserDto } from "../interfaces/auth.interface";

/**
 * Repository responsible for all authentication-related
 * database operations.
 */
export const authRepository = {
  /**
   * Find a user by email.
   */
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

  /**
   * Create a new user.
   */
  async createUser(data: RegisterUserDto) {
    return prisma.user.create({
      data,
    });
  },

  /**
   * Delete a user by ID.
   */
  async deleteUser(userId: string) {
    return prisma.user.delete({
      where: {
        id: userId,
      },
    });
  },
};
import { HTTP_STATUS } from "../constants/http-status";
import { UserResponseDto } from "../interfaces/auth.interface";
import { userRepository } from "../repositories/user.repository";
import { AppError } from "../utils/app-error";

/**
 * User business logic.
 */
export const userService = {
  /**
   * Get current user's profile.
   */
  async getProfile(userId: string): Promise<UserResponseDto> {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError(
        HTTP_STATUS.NOT_FOUND,
        "User not found."
      );
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  },
};
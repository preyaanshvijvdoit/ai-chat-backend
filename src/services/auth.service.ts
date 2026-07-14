import bcrypt from "bcrypt";

import { env } from "../config/env";
import { HTTP_STATUS } from "../constants/http-status";
import {
  LoginResponseDto,
  LoginUserDto,
  RegisterUserDto,
  UserResponseDto,
} from "../interfaces/auth.interface";
import { authRepository } from "../repositories/auth.repository";
import { AppError } from "../utils/app-error";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt";

import { generateToken } from "../utils/token";
import { emailVerificationRepository } from "../repositories/email-verification.repository";
import { mailService } from "./mail.service";

/**
 * Handles authentication business logic.
 */
export const authService = {
  /**
   * Register a new user.
   */
  async register(
    data: RegisterUserDto
  ): Promise<UserResponseDto> {
    // Check if the email is already registered.
    const existingUser = await authRepository.findByEmail(data.email);

    if (existingUser) {
      // Verified users permanently own their email.
      if (existingUser.isVerified) {
        throw new AppError(
          HTTP_STATUS.CONFLICT,
          "Email is already registered."
        );
      }

      // Find the verification token.
      const verificationToken =
        await emailVerificationRepository.findByUserId(
          existingUser.id
        );

      // If the token exists and is still valid,
      // ask the user to verify first.
      if (
        verificationToken &&
        verificationToken.expiresAt > new Date()
      ) {
        throw new AppError(
          HTTP_STATUS.CONFLICT,
          "Please verify your email before registering again."
        );
      }

      // Verification expired.
      // Delete the old unverified account.
      await authRepository.deleteUser(existingUser.id);
    }

    // Hash the user's password.
    const hashedPassword = await bcrypt.hash(
    data.password,
    env.BCRYPT_SALT_ROUNDS
    );
    // Save the user to the database.
    const user = await authRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    // Generate a verification token.
    const verificationToken = generateToken();

    // Calculate the expiry time.
    const expiresAt = new Date(
    Date.now() +
        env.EMAIL_VERIFICATION_TOKEN_EXPIRY_HOURS *
        60 *
        60 *
        1000
    );

    // Store the verification token.
    await emailVerificationRepository.createToken(
    user.id,
    verificationToken,
    expiresAt
    );

    // Send the verification email.
    await mailService.sendVerificationEmail(
    user.email,
    user.name,
    verificationToken
    );

    // Return only safe user information.
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  },

  /**
 * Authenticate a user.
 */
    async login(
    data: LoginUserDto
    ): Promise<LoginResponseDto> {
    // Find the user by email.
    const user = await authRepository.findByEmail(data.email);

    if (!user) {
        throw new AppError(
        HTTP_STATUS.UNAUTHORIZED,
        "Invalid email or password."
        );
    }

    // Compare the provided password with the stored hash.
    const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password
    );

    if (!isPasswordValid) {
        throw new AppError(
        HTTP_STATUS.UNAUTHORIZED,
        "Invalid email or password."
        );
    }

    if (!user.isVerified) {
    throw new AppError(
        HTTP_STATUS.FORBIDDEN,
        "Please verify your email before logging in."
    );
    }

    // Prepare the JWT payload.
    const payload = {
        userId: user.id,
        role: user.role,
    };

    // Generate tokens.
    const accessToken = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(payload);

    return {
        user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        },
        accessToken,
        refreshToken,
    };
    },

    /**
     * Verify a user's email address.
     */
    async verifyEmail(
    token: string
    ): Promise<void> {
    // Find the verification token.
    const verificationToken =
        await emailVerificationRepository.findByToken(token);

    if (!verificationToken) {
        throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        "Invalid verification token."
        );
    }

    // Check whether the token has expired.
    if (verificationToken.expiresAt < new Date()) {
        throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        "Verification token has expired."
        );
    }

    await emailVerificationRepository.completeEmailVerification(
        verificationToken.userId
    );
    }
};
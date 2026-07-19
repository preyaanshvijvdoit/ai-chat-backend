import { Request, Response } from "express";

import { HTTP_STATUS } from "../constants/http-status";
import { RegisterUserDto } from "../interfaces/auth.interface";
import { authService } from "../services/auth.service";
import { asyncHandler } from "../utils/async-handler";
import { sendSuccessResponse } from "../utils/api-response";

import { env } from "../config/env";
import { LoginUserDto } from "../interfaces/auth.interface";

import {
  ForgotPasswordDto,
  ResetPasswordDto,
} from "../interfaces/auth.interface";

import { GoogleLoginDto } from "../interfaces/auth.interface";

/**
 * Authentication controller.
 */
export const authController = {

  /**
   * Register a new user.
   */
    register: asyncHandler(async (req: Request, res: Response) => {
        const user = await authService.register(
        req.body as RegisterUserDto
        );

        return sendSuccessResponse(
        res,
        HTTP_STATUS.CREATED,
        "User registered successfully.",
        user
        );
    }),

    /**
     * Login an existing user.
     */
    login: asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.login(
        req.body as LoginUserDto
    );

    // Store Access Token
    res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 15 * 60 * 1000,
    });

    // Store Refresh Token
    res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return sendSuccessResponse(
        res,
        HTTP_STATUS.OK,
        "Login successful.",
        result.user
    );
    }),

    /**
     * Logout the current user.
     */
    logout: asyncHandler(async (_req: Request, res: Response) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
    });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
    });

    return sendSuccessResponse(
        res,
        HTTP_STATUS.OK,
        "Logout successful."
    );
    }),

    /**
     * Verify a user's email.
     */
    verifyEmail: asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.body;

    await authService.verifyEmail(token);

    return sendSuccessResponse(
        res,
        HTTP_STATUS.OK,
        "Email verified successfully."
    );
    }),

    /**
     * Send password reset email.
     */
    forgotPassword: asyncHandler(async (req: Request, res: Response) => {
    await authService.forgotPassword(
        req.body as ForgotPasswordDto
    );

    return sendSuccessResponse(
        res,
        HTTP_STATUS.OK,
        "If an account exists, a password reset email has been sent."
    );
    }),

    /**
     * Reset password.
     */
    resetPassword: asyncHandler(async (req: Request, res: Response) => {
    await authService.resetPassword(
        req.body as ResetPasswordDto
    );

    return sendSuccessResponse(
        res,
        HTTP_STATUS.OK,
        "Password reset successfully."
    );
    }),

    /**
     * Authenticate using Google.
     */
    googleLogin: asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.googleLogin(
        req.body as GoogleLoginDto
    );

    // Store Access Token
    res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
    });

    // Store Refresh Token
    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return sendSuccessResponse(
        res,
        HTTP_STATUS.OK,
        "Google login successful.",
        result.user
    );
    }),
    
};
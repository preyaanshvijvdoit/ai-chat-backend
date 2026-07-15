import { z } from "zod";

/**
 * Validation schema for user registration.
 */
export const registerUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long.")
    .max(100, "Name cannot exceed 100 characters."),

  email: z
    .email("Please provide a valid email address.")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(100, "Password cannot exceed 100 characters.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
});

/**
 * Validation schema for user login.
 */
export const loginUserSchema = z.object({
  email: z
    .email("Please provide a valid email address.")
    .trim()
    .toLowerCase(),

  password: z.string().min(8).max(128)
});

export const verifyEmailSchema = z.object({
  token: z.string().min(
    1,
    "Verification token is required."
  ),
});
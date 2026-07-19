import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import {
  registerUserSchema,
  loginUserSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  googleLoginSchema,
} from "../validators/auth.validator";

const router = Router();

/**
 * Register
 */
router.post(
  "/register",
  validate(registerUserSchema),
  authController.register
);

/**
 * Login
 */
router.post(
  "/login",
  validate(loginUserSchema),
  authController.login
);

/**
 * Continue with Google.
 */
router.post(
  "/google",
  validate(googleLoginSchema),
  authController.googleLogin
);

/**
 * Forgot password.
 */
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  authController.forgotPassword
);

/**
 * Reset password.
 */
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  authController.resetPassword
);

/**
 * Logout
 */
router.post(
  "/logout",
  authController.logout
);

router.post(
  "/verify-email",
  validate(verifyEmailSchema),
  authController.verifyEmail
);

export default router;
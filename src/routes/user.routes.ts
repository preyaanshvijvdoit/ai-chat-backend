import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

/**
 * Get current user's profile.
 */
router.get(
  "/me",
  authenticate,
  userController.getProfile
);

export default router;
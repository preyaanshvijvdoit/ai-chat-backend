import { Router } from "express";

import authRoutes from "./auth.routes";
import chatRoutes from "./chat.routes";
import healthRoutes from "./health.routes";
import userRoutes from "./user.routes";

const router = Router();

/**
 * Application routes.
 */
router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/chat", chatRoutes);

export default router;
import { Router } from "express";

import { HTTP_STATUS } from "../constants/http-status";
import { sendSuccessResponse } from "../utils/api-response";

const router = Router();

/**
 * Health check endpoint.
 */
router.get("/", (req, res) => {
  return sendSuccessResponse(
    res,
    HTTP_STATUS.OK,
    "AI Chat Backend is running."
  );
});

export default router;
import { ErrorRequestHandler } from "express";

import { logger } from "../config/logger";
import { HTTP_STATUS } from "../constants/http-status";
import { AppError } from "../utils/app-error";
import { sendErrorResponse } from "../utils/api-response";

/**
 * Global error handling middleware.
 * Every error thrown inside the application eventually reaches here.
 */
export const errorMiddleware: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  // Prevent unused parameter warning.
  void next;

  logger.error(
    {
      error,
      method: req.method,
      url: req.originalUrl,
    },
    error.message
  );

  if (error instanceof AppError) {
    sendErrorResponse(
      res,
      error.statusCode,
      error.message,
      error.errors
    );

    return;
  }

  sendErrorResponse(
    res,
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    "Internal Server Error"
  );
};
import { Request, Response } from "express";

import { HTTP_STATUS } from "../constants/http-status";
import { sendErrorResponse } from "../utils/api-response";

/**
 * Handles requests to routes that do not exist.
 */
export const notFoundMiddleware = (
  req: Request,
  res: Response
): Response => {
  return sendErrorResponse(
    res,
    HTTP_STATUS.NOT_FOUND,
    `Route ${req.originalUrl} not found.`
  );
};
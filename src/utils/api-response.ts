import { Response } from "express";

/**
 * Sends a standardized success response.
 */
export const sendSuccessResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: unknown,
  meta?: unknown
): Response => {
  const response: Record<string, unknown> = {
    success: true,
    message,
  };

  if (data !== undefined) {
    response.data = data;
  }

  if (meta !== undefined) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
};

/**
 * Sends a standardized error response.
 */
export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  errors?: unknown
): Response => {
  const response: Record<string, unknown> = {
    success: false,
    message,
  };

  if (errors !== undefined) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};
import { RequestHandler } from "express";

/**
 * Wraps an asynchronous Express route handler and forwards
 * any errors to the global error handling middleware.
 */
export const asyncHandler = (
  handler: RequestHandler
): RequestHandler => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
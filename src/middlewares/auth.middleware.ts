import { NextFunction, Request, Response } from "express";

import { env } from "../config/env";
import { HTTP_STATUS } from "../constants/http-status";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../utils/app-error";

/**
 * Ensures the user is authenticated.
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  void res;

  const token = req.cookies.accessToken;

  if (!token) {
    throw new AppError(
      HTTP_STATUS.UNAUTHORIZED,
      "Authentication required."
    );
  }

  const payload = verifyToken(
    token,
    env.JWT_ACCESS_SECRET
  );

  req.user = payload;

  next();
};
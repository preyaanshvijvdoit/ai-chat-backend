import jwt from "jsonwebtoken";

import { JwtPayload } from "../interfaces/jwt.interface";
import { env } from "../config/env";


/**
 * Generates an access token.
 */
export const generateAccessToken = (
  payload: JwtPayload
): string => {
  return jwt.sign(
    payload,
    env.JWT_ACCESS_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    }
  );
};

/**
 * Generates a refresh token.
 */
export const generateRefreshToken = (
  payload: JwtPayload
): string => {
  return jwt.sign(
    payload,
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
    }
  );
};

/**
 * Verifies a JWT token.
 */
export const verifyToken = (
  token: string,
  secret: string
): JwtPayload => {
  return jwt.verify(
    token,
    secret
  ) as JwtPayload;
};
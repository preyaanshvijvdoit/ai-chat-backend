import crypto from "crypto";

/**
 * Generates a secure random token.
 */
export const generateToken = (
  length = 32
): string => {
  return crypto.randomBytes(length).toString("hex");
};
import dotenv from "dotenv";
import type { StringValue } from "ms";

// Load environment variables from the .env file
dotenv.config();

/**
 * Helper function to ensure required environment variables exist.
 * If a variable is missing, the application will stop immediately.
 */
function getEnvVariable(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

/**
 * Centralized application configuration.
 * Every environment variable should be accessed through this object.
 */
export const env = {
  // =========================
  // Server
  // =========================
  PORT: Number(process.env.PORT) || 5000,

  NODE_ENV: process.env.NODE_ENV || "development",

  // =========================
  // Database
  // =========================
  DATABASE_URL: getEnvVariable("DATABASE_URL"),

  // =========================
  // JWT
  // =========================
  JWT_ACCESS_SECRET: getEnvVariable("JWT_ACCESS_SECRET"),

  JWT_REFRESH_SECRET: getEnvVariable("JWT_REFRESH_SECRET"),

  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,

  ACCESS_TOKEN_EXPIRES_IN:
    (process.env.ACCESS_TOKEN_EXPIRES_IN || "15m") as StringValue,

  REFRESH_TOKEN_EXPIRES_IN:
    (process.env.REFRESH_TOKEN_EXPIRES_IN || "7d") as StringValue,

  // =========================
  // Redis
  // =========================
  REDIS_HOST: process.env.REDIS_HOST || "localhost",

  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,

  // =========================
  // AI Providers
  // =========================
// =========================
// AI Providers
// =========================
  AI_PROVIDER: getEnvVariable("AI_PROVIDER"),

  AI_API_KEY: getEnvVariable("AI_API_KEY"),

  AI_MODEL: getEnvVariable("AI_MODEL"),


  // =========================
  // Logging
  // =========================
  LOG_LEVEL: process.env.LOG_LEVEL || "info",

  RESEND_API_KEY: process.env.RESEND_API_KEY!,
  EMAIL_FROM: process.env.EMAIL_FROM!,
  CLIENT_URL: process.env.CLIENT_URL!,
  EMAIL_VERIFICATION_TOKEN_EXPIRY_HOURS: Number(
  process.env.EMAIL_VERIFICATION_TOKEN_EXPIRY_HOURS
),
};
import pino from "pino";

import { env } from "./env";

/**
 * Centralized logger for the application.
 * Every log in the project should use this logger.
 */
export const logger = pino({
  level: env.LOG_LEVEL,

  transport:
    env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        }
      : undefined,
});
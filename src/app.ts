import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import routes from "./routes";
import cookieParser from "cookie-parser";

const app = express();

/**
 * Security middleware.
 */
app.use(helmet());

/**
 * Enable Cross-Origin Resource Sharing.
 */
app.use(cors());

/**
 * Compress HTTP responses.
 */
app.use(compression());

/**
 * Parse incoming JSON requests.
 */
app.use(express.json());

/**
 * Parse URL-encoded form data.
 */
app.use(express.urlencoded({ extended: true }));

/*************************************************************
 * Parse cookies from incoming requests.
 *************************************************************/
app.use(cookieParser());

/**
 * Health check route.
 */
app.use("/api/v1", routes);

/**
 * Handle unknown routes.
 */
app.use(notFoundMiddleware);

/**
 * Global error handler.
 * This must always be the last middleware.
 */
app.use(errorMiddleware);

export default app;
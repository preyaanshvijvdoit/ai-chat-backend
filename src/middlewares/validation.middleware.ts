import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

import { HTTP_STATUS } from "../constants/http-status";
import { AppError } from "../utils/app-error";

type RequestProperty = "body" | "params" | "query";

/**
 * Validates any part of an Express request.
 */
export const validate = (
  schema: ZodSchema,
  property: RequestProperty = "body"
) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    void res;

    const result = schema.safeParse(req[property]);

    if (!result.success) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        "Validation failed.",
        result.error.issues.map((issue) => issue.message)
      );
    }

    req[property] = result.data;

    next();
  };
};
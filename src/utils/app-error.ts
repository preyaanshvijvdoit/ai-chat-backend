/**
 * Custom application error.
 * Every operational error in the application should use this class.
 */
export class AppError extends Error {
  /**
   * HTTP status code associated with the error.
   */
  public readonly statusCode: number;

  /**
   * Indicates whether the error is expected (operational)
   * or an unexpected programming error.
   */
  public readonly isOperational: boolean;

  /**
   * Optional list of additional error details.
   * Useful for validation errors.
   */
  public readonly errors?: string[];

  constructor(
    statusCode: number,
    message: string,
    errors?: string[]
  ) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}
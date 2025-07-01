import BaseError from "./base.error.js";

/**
 * AppError is a custom error used for application-specific exceptions.
 * It extends the BaseError to provide standardized error formatting.
 */
class AppError extends BaseError {
  /**
   * Creates a new AppError instance.
   * @param {number} statusCode - HTTP status code representing the error type.
   * @param {string} message - A descriptive error message.
   * @param {Array|Object} data - Additional error details (optional).
   */
  constructor(statusCode, message, data) {
    super("APP-ERROR", statusCode, message, data);
  }
}

export default AppError;

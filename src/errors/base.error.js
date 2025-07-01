/**
 * BaseError is a custom error class that extends the built-in Error.
 * It provides additional properties like status code and structured error data.
 */
class BaseError extends Error {
  /**
   * Creates a new BaseError instance.
   * @param {string} name - Name/type of the error (e.g., 'ValidationError').
   * @param {number} statusCode - HTTP status code (e.g., 400, 500).
   * @param {string} message - Error message to be shown.
   * @param {Array|Object} data - Additional error details or explanations.
   */
  constructor(name, statusCode, message, data) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export default BaseError;

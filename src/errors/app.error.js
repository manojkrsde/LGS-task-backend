import BaseError from "./base.error.js";

class AppError extends BaseError {
  constructor(statusCode, message, data) {
    super("APP-ERROR", statusCode, message, data);
  }
}

export default AppError;

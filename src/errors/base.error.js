class BaseError extends Error {
  constructor(name, statusCode, message, data) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.message = message;
    this.details = data;
  }
}

export default BaseError;

class BaseError extends Error {
  constructor(name, statusCode, message, data) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export default BaseError;

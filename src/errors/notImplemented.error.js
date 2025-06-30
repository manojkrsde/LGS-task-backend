import { StatusCodes } from "http-status-codes";
import BaseError from "./base.error.js";

class NotImplementedError extends BaseError {
  constructor(propertyName) {
    super(
      "NOT-IMPLEMENTED-ERROR",
      StatusCodes.NOT_IMPLEMENTED,
      `${propertyName} is Not Implemented`,
      []
    );
  }
}

export default NotImplementedError;

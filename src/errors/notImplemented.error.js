import { StatusCodes } from "http-status-codes";
import BaseError from "./base.error.js";

/**
 * NotImplementedError is a specific type of error used to indicate
 * that a particular feature or method is not yet implemented.
 */
class NotImplementedError extends BaseError {
  /**
   * Creates a new NotImplementedError.
   * @param {string} propertyName - Name of the property or method not implemented.
   */
  constructor(propertyName) {
    super(
      "NOT-IMPLEMENTED-ERROR",                  // Error name
      StatusCodes.NOT_IMPLEMENTED,              // HTTP 501
      `${propertyName} is Not Implemented`,     // Human-readable message
      []                                        // Additional data (empty array by default)
    );
  }
}

export default NotImplementedError;

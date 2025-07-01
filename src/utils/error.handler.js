import { StatusCodes } from "http-status-codes";
import BaseError from "../errors/base.error.js";

/**
 * Global error handling middleware for Express.
 * 
 * This function catches errors thrown in the application and returns
 * a structured response to the client.
 *
 * @param {Error} err - The error object thrown by the application.
 * @param {Request} _ - Express request object (unused).
 * @param {Response} res - Express response object used to send the error response.
 * @param {Function} next - Express next middleware function.
 * @returns {Response} - JSON response with error details.
 */
const errorHandler = (err, _, res, next) => {
  console.log(err);

  // Handle custom application errors
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.data,
      data: [],
    });
  }

  // Handle unexpected/internal errors
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Something went wrong!!",
    error: err.message || err,
    data: {},
  });
};

export default errorHandler;

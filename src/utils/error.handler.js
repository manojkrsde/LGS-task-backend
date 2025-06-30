import { StatusCodes } from "http-status-codes";
import BaseError from "../errors/base.error.js";

const errorHandler = (err, _, res, next) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.data,
      data: [],
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Something went wrong!!",
    error: err.message || err,
    data: {},
  });
};

export default errorHandler;

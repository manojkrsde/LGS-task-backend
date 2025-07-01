import { StatusCodes } from "http-status-codes";

import AppError from "../errors/app.error.js";
import {getMissingFields} from "./user.middleware.js";


export const validateCreateBookRequest = (req, _, next) => {
  const missingFields = getMissingFields(
    ["title", "description"],
    req.body
  );

  if (missingFields.length) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Please enter valid details",
      missingFields
    );
  }
  next();
};





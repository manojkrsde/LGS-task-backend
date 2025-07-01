import { StatusCodes } from "http-status-codes";

import AppError from "../errors/app.error.js";

const getMissingFields = (fields, reqBody) =>
  fields
    .filter((field) => !reqBody?.[field])
    .map((field) => `${field} is missing in the request`);


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





import { StatusCodes } from "http-status-codes";

import AppError from "../errors/app.error.js";

const getMissingFields = (fields, reqBody) =>
  fields
    .filter((field) => !reqBody[field])
    .map((field) => `${field} is missing in the request`);

export const validateRegisterRequest = (req, _, next) => {
  const missingFields = getMissingFields(
    ["name", "email", "password"],
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

export const validateLoginRequest = (req, _, next) => {
  const missingFields = getMissingFields(["email", "password"], req.body);

  if (missingFields.length) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Please enter valid details",
      missingFields
    );
  }

  next();
};

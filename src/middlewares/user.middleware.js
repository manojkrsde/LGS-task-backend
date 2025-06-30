import { StatusCodes } from "http-status-codes";

import AppError from "../errors/app.error.js";
import UserService from "../services/user.service.js";

const getMissingFields = (fields, reqBody) =>
  fields
    .filter((field) => !reqBody?.[field])
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

export const checkAuthentication = async (req, _, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const userService = new UserService();
      const response = await userService.isAuthenticated(token);

      if (response) {
        req.user = response;
        next();
      }
    }
    throw new AppError(StatusCodes.BAD_REQUEST, "Authentication Failed", [
      "Missing JWT token",
    ]);
  } catch (error) {
    next(error);
  }
};



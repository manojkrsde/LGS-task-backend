import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import AppError from "../errors/app.error.js";
import UserService from "../services/user.service.js";

// Joi validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email address",
  }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).+$"))
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must include uppercase, lowercase, number, and special character",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email address",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

// Validate Register Request
export const validateRegisterRequest = (req, _, next) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid registration data", messages);
  }

  next();
};

// Validate Login Request
export const validateLoginRequest = (req, _, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid login data", messages);
  }

  next();
};

// Check Authentication
export const checkAuthentication = async (req, _, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Authentication Failed", [
        "Missing or malformed JWT token",
      ]);
    }

    const token = authHeader.split(" ")[1];
    const userService = new UserService();
    const response = await userService.isAuthenticated(token);

    if (!response) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid token", [
        "Token verification failed",
      ]);
    }

    req.user = response;
    next();
  } catch (error) {
    next(error);
  }
};

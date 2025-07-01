import { StatusCodes } from "http-status-codes";
import { generateToken, checkPassword, verifyToken } from "../utils/auth.js";

import AppError from "../errors/app.error.js";
import UserRepository from "../repository/user.repository.js";
import db from "../models/index.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository(db.User);
  }

  async createUser(data) {
    try {
      const existingUser = await this.userRepository.getUserByEmail(data.email);

      if (existingUser) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Account already exists", [
          `User account already exists for given email: ${data.email}`,
        ]);
      }

      const user = await this.userRepository.create(data);
      const token = generateToken({ id: user.id, email: user.email ,name:user.name});
      const { exp } = verifyToken(token);
      const expiresAt = new Date(exp * 1000);
      return { token, exp, expiresAt ,name:user.name};
    } catch (error) {
      this.handleSequelizeError(error);
      throw new Error("Cannot register a new user");
    }
  }

  async loginUser(data) {
    try {
      const user = await this.userRepository.getUserByEmail(data.email);
      if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, "Email is not registered", [
          "No user found for the given email.",
        ]);
      }

      const isPasswordCorrect = checkPassword(data.password, user.password);
      if (!isPasswordCorrect) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Incorrect password", [
          "Incorrect password provided.",
        ]);
      }

      const token = generateToken({ id: user.id,email: user.email,name:user.name });
      const { exp } = verifyToken(token);
      const expiresAt = new Date(exp * 1000);
      return { token, exp, expiresAt,name:user.name };
    } catch (error) {
      this.handleSequelizeError(error);
      throw new Error("Cannot sign in user");
    }
  }

  async verifyToken(token) {
    try {
      if(!token) throw new AppError(StatusCodes.BAD_REQUEST,"Token not found!",[]);
      const { exp,name } = verifyToken(token);
      const expiresAt = new Date(exp * 1000);
      return { token, exp, expiresAt,name };
    } catch (error) {
      this.handleSequelizeError(error);
      throw new Error("Cannot sign in user");
    }
  }

  handleSequelizeError(error) {
    if (error instanceof AppError) throw error;

    if (error.name === "SequelizeValidationError") {
      const explanation = error.errors.map((err) => err.message);
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Validation failed",
        explanation
      );
    }
  }

  async isAuthenticated(token) {
    try {
      if (!token) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Authentication Failed", [
          "Missing JWT token",
        ]);
      }
      return verifyToken(token);
    } catch (error) {
      if (error instanceof AppError) throw error;

      // JWT-specific errors
      const jwtErrors = {
        JsonWebTokenError: "Invalid JWT token",
        TokenExpiredError: "JWT token expired",
      };

      if (jwtErrors[error.name]) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Authentication Failed", [
          jwtErrors[error.name],
        ]);
      }
      throw new InternalServerError("Authentication failed");
    }
  }
}

export default UserService;

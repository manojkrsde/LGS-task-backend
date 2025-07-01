import { StatusCodes } from "http-status-codes";
import { generateToken, checkPassword, verifyToken } from "../utils/auth.js";
import AppError from "../errors/app.error.js";
import UserRepository from "../repository/user.repository.js";
import db from "../models/index.js";

/**
 * Service class to handle user-related operations such as registration,
 * login, and token verification.
 */
class UserService {
  constructor() {
    this.userRepository = new UserRepository(db.User);
  }

  /**
   * Creates a new user if the email is not already registered.
   * @param {Object} data - The user registration data.
   * @returns {Object} - JWT token, expiration info, and user name.
   */
  async createUser(data) {
    try {
      const existingUser = await this.userRepository.getUserByEmail(data.email);

      if (existingUser) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Account already exists", [
          `User account already exists for given email: ${data.email}`,
        ]);
      }

      const user = await this.userRepository.create(data);
      const token = generateToken({ id: user.id, email: user.email, name: user.name });
      const { exp } = verifyToken(token);
      const expiresAt = new Date(exp * 1000);

      return { token, exp, expiresAt, name: user.name };
    } catch (error) {
      this.handleSequelizeError(error);
      throw new Error("Cannot register a new user");
    }
  }

  /**
   * Logs in a user by validating email and password.
   * @param {Object} data - The login credentials.
   * @returns {Object} - JWT token, expiration info, and user name.
   */
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

      const token = generateToken({ id: user.id, email: user.email, name: user.name });
      const { exp } = verifyToken(token);
      const expiresAt = new Date(exp * 1000);

      return { token, exp, expiresAt, name: user.name };
    } catch (error) {
      this.handleSequelizeError(error);
      throw new Error("Cannot sign in user");
    }
  }

  /**
   * Verifies a JWT token and returns its expiration details.
   * @param {string} token - The JWT token.
   * @returns {Object} - Token, expiration timestamp, and user name.
   */
  async verifyToken(token) {
    try {
      if (!token) throw new AppError(StatusCodes.BAD_REQUEST, "Token not found!", []);
      const { exp, name } = verifyToken(token);
      const expiresAt = new Date(exp * 1000);
      return { token, exp, expiresAt, name };
    } catch (error) {
      this.handleSequelizeError(error);
      throw new Error("Cannot sign in user");
    }
  }

  /**
   * Handles Sequelize validation errors and throws an AppError.
   * @param {Object} error - The error object thrown by Sequelize.
   */
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

  /**
   * Verifies the token and returns user data if valid.
   * @param {string} token - The JWT token.
   * @returns {Object} - Decoded token data.
   */
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

      // Handle known JWT errors
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

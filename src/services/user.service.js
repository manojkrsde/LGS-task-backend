import { StatusCodes } from "http-status-codes";
import { generateToken, checkPassword } from "../utils/auth.js";

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
      const token = generateToken({ id: user.id, email: user.email });
      return token;
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

      const token = generateToken({ id: user.id });
      return token;
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
}

export default UserService;

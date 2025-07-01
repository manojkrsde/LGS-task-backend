import { StatusCodes } from "http-status-codes";
import UserService from "../services/user.service.js";

/**
 * Controller for handling user-related operations such as registration, login, and token verification.
 */
class UserController {
  userService = new UserService();

  /**
   * Handles user registration.
   * Expects `name`, `email`, and `password` in the request body.
   */
  register = async (req, res, next) => {
    try {
      const { name, email, password } = req.body || {};
      const token = await this.userService.createUser({ name, email, password });

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: "User registered successfully!",
        data: token,
        error: {},
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Handles user login.
   * Expects `email` and `password` in the request body.
   */
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body || {};
      const token = await this.userService.loginUser({ email, password });

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Login successful",
        data: token,
        error: {},
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Verifies the provided JWT token.
   * Expects `token` in the request body.
   */
  verifyToken = async (req, res, next) => {
    try {
      const { token } = req.body || {};
      const response = await this.userService.verifyToken(token);

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Token verified",
        data: response,
        error: {},
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new UserController();

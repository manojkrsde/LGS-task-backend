import { StatusCodes } from "http-status-codes";
import UserService from "../services/user.service.js";

class UserController {
  userService = new UserService();

  register = async (req, res, next) => {
    try {
      const { name, email, password } = req.body || {};
      const token = await this.userService.createUser({
        name,
        email,
        password,
      });

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
}

export default new UserController();

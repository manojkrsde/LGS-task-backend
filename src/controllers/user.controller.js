import NotImplementedError from "../errors/notImplemented.error.js";

class UserController {
  static async register(req, res, next) {
    try {
      throw new NotImplementedError("register");
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      throw new NotImplementedError("login");
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;

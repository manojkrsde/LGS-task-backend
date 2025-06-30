import { StatusCodes } from "http-status-codes";
import NotImplementedError from "../errors/notImplemented.error.js";

class UserService {
  async createUser(data) {
    throw new NotImplementedError("createUser @ user.service.js");
  }

  async loginUser(data) {
    throw new NotImplementedError("loginUser @ user.service.js");
  }
}

export default UserService;

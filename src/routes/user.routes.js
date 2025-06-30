import express from "express";

import pingCheck from "../controllers/ping.controller.js";
import {
  validateRegisterRequest,
  validateLoginRequest,
} from "../middlewares/user.middleware.js";
import UserController from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/ping", pingCheck("User API is live..."));

userRouter.post("/register", validateRegisterRequest, UserController.register);

userRouter.post("/login", validateLoginRequest, UserController.login);

export default userRouter;

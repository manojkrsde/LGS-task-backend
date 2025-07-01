import express from "express";

import pingCheck from "../controllers/ping.controller.js";
import {
  validateRegisterRequest,
  validateLoginRequest,
} from "../middlewares/user.middleware.js";
import userController from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/ping", pingCheck("User API is live..."));

userRouter.post("/register", validateRegisterRequest, userController.register);

userRouter.post("/login", validateLoginRequest, userController.login);

userRouter.post("/verify", userController.verifyToken);

export default userRouter;

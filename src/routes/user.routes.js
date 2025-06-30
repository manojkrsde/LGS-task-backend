import express from "express";

import pingCheck from "../controllers/ping.controller.js";
import {
  validateRegisterRequest,
  validateLoginRequest,
} from "../middlewares/user.middleware.js";

const userRouter = express.Router();

userRouter.get("/ping", pingCheck("User API is live..."));

userRouter.post("/register", validateRegisterRequest);

userRouter.post("/login", validateLoginRequest);

export default userRouter;

/**
 * User Routes
 * -----------
 * Handles all user-related routes including:
 * - Health check (`GET /ping`)
 * - User registration with validation (`POST /register`)
 * - User login with credential validation (`POST /login`)
 * - JWT token verification (`POST /verify`)
 *
 * All routes are publicly accessible and include necessary middleware checks for request validity.
 */

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

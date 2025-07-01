/**
 * API Router
 * ----------
 * Combines and organizes all application-level API routes:
 *
 * - GET /api/ping       → Health check for API router.
 * - /api/users          → Routes for user authentication (register, login, verify).
 * - /api/books          → Protected routes for book management (CRUD).
 *
 * This acts as the central router for all versioned and feature-based routes.
 */

import express from "express";

import pingCheck from "../controllers/ping.controller.js";
import userRouter from "./user.routes.js";
import bookRouter from "./book.routes.js";

const apiRouter = express.Router();

apiRouter.get("/ping", pingCheck("API Router is live..."));

apiRouter.use("/users", userRouter);

apiRouter.use("/books", bookRouter);

export default apiRouter;

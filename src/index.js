import express from "express";
import cors from "cors";

import config from "./config/server.config.js";
import pingCheck from "./controllers/ping.controller.js";
import apiRouter from "./routes/index.js";
import errorHandler from "./utils/error.handler.js";

// Initialize Express app
const app = express();

/**
 * Enable CORS for cross-origin requests
 */
app.use(cors());

/**
 * Body parsers for handling different content types
 */
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json());                         // Parse JSON bodies
app.use(express.text());                         // Parse plain text bodies
app.use(express.raw());                          // Parse raw binary data

/**
 * Health check route
 * GET /ping → Returns a simple message to confirm server is running
 */
app.get("/ping", pingCheck("Server is live..."));

/**
 * API routes
 * All routes starting with /api will be handled by apiRouter
 */
app.use("/api", apiRouter);

/**
 * Global error handler
 * Captures any unhandled errors from above routes/middlewares
 */
app.use(errorHandler);

/**
 * Start the server
 */
app.listen(config.PORT, () => {
  console.log(
    `${config.APP_NAME} running at http://localhost:${config.PORT} (${config.NODE_ENV})`
  );
});

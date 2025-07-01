import express from "express";
import cors from "cors";

import config from "./config/server.config.js";
import pingCheck from "./controllers/ping.controller.js";
import apiRouter from "./routes/index.js";
import errorHandler from "./utils/error.handler.js";

const app = express();

//cors middleware
app.use(cors());

//body parsing middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());
app.use(express.raw());

// Root health check route
app.get("/ping", pingCheck("Server is live..."));

app.use("/api", apiRouter);

//last middleware for handling errors
app.use(errorHandler);

// Start server
app.listen(config.PORT, () => {
  console.log(
    `${config.APP_NAME} running at http://localhost:${config.PORT} (${config.NODE_ENV})`
  );
});

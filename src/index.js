import express from "express";
import config from "./config/server.config.js";
import pingCheck from "./controllers/ping.controller.js";
import apiRouter from "./routes/index.js";

const app = express();

// Root health check route
app.get("/ping", pingCheck("Server is live..."));

app.use("/api", apiRouter);

// Start server
app.listen(config.PORT, () => {
  console.log(
    `${config.APP_NAME} running at http://localhost:${config.PORT} (${config.NODE_ENV})`
  );
});

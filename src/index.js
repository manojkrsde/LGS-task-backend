import express from "express";
import config from "./config/server.config.js";

const app = express();

// Root health check route
app.get("/", (_, res) => {
  res.json({ message: "Server is live!" });
});

// Start server
app.listen(config.PORT, () => {
  console.log(
    `${config.APP_NAME} running at http://localhost:${config.PORT} (${config.NODE_ENV})`
  );
});

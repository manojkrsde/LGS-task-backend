import express from "express";

import pingCheck from "../controllers/ping.controller.js";
import userRouter from "./user.routes.js";
import bookRouter from "./book.routes.js";

const apiRouter = express.Router();

apiRouter.get("/ping", pingCheck("API Router is live..."));

apiRouter.use("/users", userRouter);

apiRouter.use("/books", bookRouter);

export default apiRouter;

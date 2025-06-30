import express from "express";

import pingCheck from "../controllers/ping.controller.js";
import { checkAuthentication } from "../middlewares/user.middleware.js";

const bookRouter = express.Router();

bookRouter.get("/ping", checkAuthentication, pingCheck("Books API is live..."));

export default bookRouter;

import express from "express";

import pingCheck from "../controllers/ping.controller.js";
import { checkAuthentication } from "../middlewares/user.middleware.js";
import {validateCreateBookRequest} from '../middlewares/books.middleware.js';

import booksController from "../controllers/books.controller.js";

const bookRouter = express.Router();

bookRouter.use(checkAuthentication);

bookRouter.get("/ping", pingCheck("Books API is live..."));

bookRouter.get("/",booksController.getAllBooks);

bookRouter.post("/",validateCreateBookRequest,booksController.createBook);

bookRouter.get('/:id',booksController.getBookById);

bookRouter.put("/:id",validateCreateBookRequest,booksController.updateBook);

bookRouter.delete('/:id',booksController.deleteBook);

export default bookRouter;

/**
 * Book Routes
 * -----------
 * Handles all book-related operations for authenticated users:
 * - Health check (`GET /ping`)
 * - Fetch all books with pagination and sorting (`GET /`)
 * - Create a new book with validation (`POST /`)
 * - Get a specific book by ID (`GET /:id`)
 * - Update an existing book with validation (`PUT /:id`)
 * - Delete a book by ID (`DELETE /:id`)
 *
 * All routes are protected by JWT-based authentication (`checkAuthentication` middleware).
 */

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

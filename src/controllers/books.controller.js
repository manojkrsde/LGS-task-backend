import { StatusCodes } from "http-status-codes";
import BooksService from "../services/books.service.js";


class UserController {
  booksService = new BooksService();

  createBook = async (req, res, next) => {
    try {

      const { user_id, title, description } = req.body || {};
      const response = await this.booksService.createBook({
        user_id,
        title,
        description,
      },req.user);

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Books created successfully!",
        data: response,
        error: {},
      });
    } catch (error) {
      next(error);
    }
  };

  updateBook = async (req, res, next) => {
    try {
      const bookId=req.params.id;
      const { user_id, title, description } = req.body || {};
      const response = await this.booksService.updateBook({
        user_id,
        title,
        description,
      },req.user,bookId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Books updated successfully!",
        data: response,
        error: {},
      });
    } catch (error) {
      next(error);
    }
  };

  deleteBook = async (req, res, next) => {
    try {

      const book_id = req?.params?.id || null;
      const response = await this.booksService.deleteBook(book_id,req.user);

      res.status(StatusCodes.OK).json({
        success: true,
        message: `Book with id ${book_id} deleted successfully!`,
        data: response,
        error: {},
      });
    } catch (error) {
      next(error);
    }
  };

  getAllBooks = async (req, res, next) => {
    try {
      const response = await this.booksService.getAllBooks(req.query,req.user);
      res.status(StatusCodes.OK).json({
        success: true,
        message: `Fetched all books successfully!`,
        data: response,
        error: {},
      });
    } catch (error) {
      next(error);
    }
  };

  getBookById = async (req, res, next) => {
    try {
      const id=req.params.id;
      const response = await this.booksService.getBookById(id,req.user);
      res.status(StatusCodes.OK).json({
        success: true,
        message: `Fetched book with id ${id} successfully!`,
        data: response,
        error: {},
      });
    } catch (error) {
      next(error);
    }
  };

}

export default new UserController();

import { StatusCodes } from "http-status-codes";
import BooksService from "../services/books.service.js";

/**
 * Controller class to handle all book-related HTTP requests.
 */
class UserController {
  booksService = new BooksService();

  /**
   * Create a new book.
   * @route POST /api/books
   * @param {Object} req.body - { title, description }
   * @param {Object} req.user - Authenticated user object
   */
  createBook = async (req, res, next) => {
    try {
      const { user_id, title, description } = req.body || {};
      const response = await this.booksService.createBook(
        { user_id, title, description },
        req.user
      );

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

  /**
   * Update a book by ID.
   * @route PUT /api/books/:id
   * @param {String} req.params.id - Book ID
   * @param {Object} req.body - { title, description }
   * @param {Object} req.user - Authenticated user object
   */
  updateBook = async (req, res, next) => {
    try {
      const bookId = req.params.id;
      const { user_id, title, description } = req.body || {};
      const response = await this.booksService.updateBook(
        { user_id, title, description },
        req.user,
        bookId
      );

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

  /**
   * Delete a book by ID.
   * @route DELETE /api/books/:id
   * @param {String} req.params.id - Book ID
   * @param {Object} req.user - Authenticated user object
   */
  deleteBook = async (req, res, next) => {
    try {
      const book_id = req?.params?.id || null;
      const response = await this.booksService.deleteBook(book_id, req.user);

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

  /**
   * Get all books with optional sorting and pagination.
   * @route GET /api/books
   * @param {Object} req.query - Query parameters: sort, pageNumber, pageSize
   * @param {Object} req.user - Authenticated user object
   */
  getAllBooks = async (req, res, next) => {
    try {
      const response = await this.booksService.getAllBooks(req.query, req.user);
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

  /**
   * Get a single book by ID.
   * @route GET /api/books/:id
   * @param {String} req.params.id - Book ID
   * @param {Object} req.user - Authenticated user object
   */
  getBookById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const response = await this.booksService.getBookById(id, req.user);
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

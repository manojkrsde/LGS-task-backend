import { StatusCodes } from "http-status-codes";
import AppError from "../errors/app.error.js";
import BooksRepository from "../repository/books.repository.js";
import db from "../models/index.js";

/**
 * Service class to handle operations related to books:
 * - Create
 * - Update
 * - Fetch with pagination & sorting
 * - Fetch by ID
 * - Delete
 */
class BooksService {
  constructor() {
    this.booksRepository = new BooksRepository(db.Book);
  }

  /**
   * Creates a new book for the authenticated user.
   * @param {Object} data - Book data (title, description).
   * @param {Object} user - Authenticated user object.
   * @returns {Object} - Created book record.
   */
  async createBook(data, user) {
    try {
      const response = await this.booksRepository.create({ ...data, user_id: user.id });
      return response;
    } catch (error) {
      this.handleSequelizeError(error);
      throw new Error("Cannot register a new book");
    }
  }

  /**
   * Updates an existing book by ID for the user.
   * @param {Object} data - Book data to update.
   * @param {Object} user - Authenticated user object.
   * @param {number} bookId - ID of the book to update.
   * @returns {Object} - Updated book.
   */
  async updateBook(data, user, bookId) {
    try {
      const response = await this.booksRepository.update(bookId, {
        ...data,
        user_id: user.id,
      });
      return response;
    } catch (error) {
      this.handleSequelizeError(error);
      throw new Error("Cannot update a book");
    }
  }

  /**
   * Retrieves all books with pagination and optional sorting.
   * @param {Object} queryParams - Query parameters for sorting and pagination.
   * @param {Object} user - Authenticated user object.
   * @returns {Object} - Paginated list of books.
   */
  async getAllBooks(queryParams, user) {
    try {
      const { sort = "", pageNumber = "1", pageSize = "5" } = queryParams;
      const page = parseInt(pageNumber);
      const size = parseInt(pageSize);
      const validPage = !isNaN(page) && page > 0 ? page : 1;
      const validSize = !isNaN(size) && size > 0 ? size : 5;
      const offset = (validPage - 1) * validSize;
      const limit = validSize;

      const order = [];
      if (sort.trim()) {
        sort.split(",").forEach((item) => {
          const [field, direction] = item.trim().split("-");
          if (field) {
            order.push([field, direction?.toUpperCase() === "DESC" ? "DESC" : "ASC"]);
          }
        });
      }

      const query = {
        where: { user_id: user.id },
        limit,
        offset,
        ...(order.length > 0 && { order }),
      };

      const { count, rows } = await this.booksRepository.getAndCountAll(query);

      if (!rows || rows.length === 0) {
        throw new AppError(StatusCodes.NOT_FOUND, "No books found", []);
      }

      const totalPages = Math.ceil(count / validSize);
      const nextPage = validPage < totalPages ? validPage + 1 : null;

      return {
        data: rows,
        currentPage: validPage,
        nextPage,
        totalItems: count,
        totalPages,
      };
    } catch (error) {
      this.handleSequelizeError(error);
      throw new Error("Unable to fetch books");
    }
  }

  /**
   * Fetches a single book by its ID.
   * Validates if the book belongs to the current user.
   * @param {number} id - Book ID.
   * @param {Object} user - Authenticated user object.
   * @returns {Object} - Book object.
   */
  async getBookById(id, user) {
    try {
      const response = await this.booksRepository.get(id);
      if (!response) {
        throw new AppError(StatusCodes.NOT_FOUND, `No book found with id ${id}`, []);
      }

      if (user.id !== response.dataValues.user_id) {
        throw new AppError(
          StatusCodes.UNAUTHORIZED,
          "You cannot access others book",
          []
        );
      }

      return response;
    } catch (error) {
      this.handleSequelizeError(error);
      throw new Error("Unable to fetch books");
    }
  }

  /**
   * Deletes a book after validating ownership.
   * @param {number} id - Book ID.
   * @param {Object} user - Authenticated user object.
   * @returns {Object} - Deletion result.
   */
  async deleteBook(id, user) {
    try {
      if (!id) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Book id missing", [
          `Cannot delete the book`,
        ]);
      }

      const findBook = await this.booksRepository.get(id);
      if (!findBook) {
        throw new AppError(
          StatusCodes.NOT_FOUND,
          `Book with id ${id} not found`,
          [`Cannot delete the book`]
        );
      }

      if (user.id !== findBook.dataValues.user_id) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized user", [
          `Trying to delete other users' books is not allowed`,
        ]);
      }

      const response = await this.booksRepository.destroy(id);
      return response;
    } catch (error) {
      this.handleSequelizeError(error);
      throw new Error("Cannot delete a book");
    }
  }

  /**
   * Handles Sequelize validation and unique constraint errors.
   * Throws formatted AppError based on the error type.
   * @param {Error} error - Sequelize error object.
   */
  handleSequelizeError(error) {
    if (error instanceof AppError) throw error;

    if (error.name === "SequelizeUniqueConstraintError") {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Duplicate entry violation",
        ["On column: title & user_id"]
      );
    }

    if (error.name === "SequelizeValidationError") {
      const explanation = error.errors.map((err) => err.message);
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Validation failed",
        explanation
      );
    }
  }
}

export default BooksService;

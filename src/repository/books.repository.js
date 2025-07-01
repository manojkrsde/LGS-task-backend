import CrudRepository from "./crud.repository.js";

/**
 * BooksRepository extends the generic CrudRepository
 * to interact with the Book model.
 * 
 * You can add custom queries specific to books here in the future.
 */
class BooksRepository extends CrudRepository {
  /**
   * Initializes the repository with the Book model.
   * @param {Object} model - Sequelize Book model.
   */
  constructor(model) {
    super(model);
  }
}

export default BooksRepository;

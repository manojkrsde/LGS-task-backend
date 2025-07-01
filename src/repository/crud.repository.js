/**
 * Base repository class to abstract common CRUD operations.
 * All repositories can extend this class to inherit generic methods.
 */
class CrudRepository {
  /**
   * Initializes the repository with a specific Sequelize model.
   * @param {Object} model - Sequelize model to operate on.
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * Creates a new record.
   * @param {Object} data - Data to insert into the table.
   * @returns {Promise<Object>} - Created record.
   */
  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  /**
   * Deletes a record by ID.
   * @param {number|string} id - Primary key of the record to delete.
   * @returns {Promise<number>} - Number of records deleted (0 or 1).
   */
  async destroy(id) {
    const response = await this.model.destroy({ where: { id } });
    return response;
  }

  /**
   * Retrieves a record by its primary key.
   * @param {number|string} id - Primary key of the record.
   * @returns {Promise<Object|null>} - Found record or null if not found.
   */
  async get(id) {
    const response = await this.model.findByPk(id);
    return response;
  }

  /**
   * Retrieves all records matching a given query.
   * @param {Object} query - Sequelize query options (e.g., where, limit, offset).
   * @returns {Promise<Array>} - Array of matching records.
   */
  async getAll(query) {
    const response = await this.model.findAll(query);
    return response;
  }

  /**
   * Retrieves records and the total count matching a given query.
   * Useful for paginated results.
   * @param {Object} query - Sequelize query options.
   * @returns {Promise<{ rows: Array, count: number }>} - Result set and total count.
   */
  async getAndCountAll(query) {
    const response = await this.model.findAndCountAll(query);
    return response;
  }

  /**
   * Updates a record by ID.
   * @param {number|string} key - Primary key of the record to update.
   * @param {Object} data - Updated data fields.
   * @returns {Promise<[number]>} - Array where first item is number of affected rows.
   */
  async update(key, data) {
    const response = await this.model.update(data, { where: { id: key } });
    return response;
  }
}

export default CrudRepository;

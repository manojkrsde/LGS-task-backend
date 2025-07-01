import CrudRepository from "./crud.repository.js";

/**
 * UserRepository extends the generic CrudRepository to handle
 * specific operations related to the User model.
 */
class UserRepository extends CrudRepository {
  /**
   * Initializes the repository with the User model.
   * @param {Object} model - Sequelize User model.
   */
  constructor(model) {
    super(model);
  }

  /**
   * Finds a user by their email address.
   * @param {string} email - The email address to search for.
   * @returns {Promise<Object|null>} - The user record if found, otherwise null.
   */
  async getUserByEmail(email) {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}

export default UserRepository;

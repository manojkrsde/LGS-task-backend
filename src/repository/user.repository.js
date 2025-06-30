import CrudRepository from "./crud.repository.js";

class UserRepository extends CrudRepository {
  constructor(model) {
    super(model);
  }

  async getUserByEmail(email) {
    const user = await this.model.findOne({ where: { email: email } });
    return user;
  }
}

export default UserRepository;



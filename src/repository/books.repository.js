import CrudRepository from "./crud.repository.js";

class BooksRepository extends CrudRepository {
  constructor(model) {
    super(model);
  }
}

export default BooksRepository;



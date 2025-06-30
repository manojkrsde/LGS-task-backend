import { StatusCodes } from "http-status-codes";
import NotImplementedError from "../errors/notImplemented.error";

class CrudRepository {
  async create(data) {
    throw new NotImplementedError("create @ crud.repository.js");
  }

  async destroy(data) {
    throw new NotImplementedError("destroy @ crud.repository.js");
  }

  async get(id) {
    throw new NotImplementedError("get @ crud.repository.js");
  }

  async getAll() {
    throw new NotImplementedError("getAll @ crud.repository.js");
  }

  async update(key, data) {
    throw new NotImplementedError("update @ crud.repository.js");
  }
}

export default CrudRepository;

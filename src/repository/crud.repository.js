class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  async destroy(id) {
    const response = await this.model.destroy({ where: { id: id } });
    return response;
  }

  async get(id) {
    const response = await this.model.findByPk(id);
    return response;
  }

  async getAll(query) {
    const response = await this.model.findAll(query);
    return response;
  }

  async getAndCountAll(query) {
    const response = await this.model.findAndCountAll(query);
    return response;
  }

  async update(key, data) {
    const response = await this.model.update(data, { where: { id: key } });
    return response;
  }
}

export default CrudRepository;

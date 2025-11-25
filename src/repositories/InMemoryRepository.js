class InMemoryRepository {
  constructor(entityFactory) {
    this.entityFactory = entityFactory;
    this.items = new Map();
    this.currentId = 1;
  }

  list() {
    return Array.from(this.items.values());
  }

  findById(id) {
    return this.items.get(Number(id)) || null;
  }

  create(data) {
    const entity = this.entityFactory({ ...data, id: this.currentId++ });
    this.items.set(entity.id, entity);
    return entity;
  }

  update(id, data) {
    const entity = this.findById(id);
    if (!entity) return null;
    entity.updateFrom(data);
    this.items.set(entity.id, entity);
    return entity;
  }

  delete(id) {
    return this.items.delete(Number(id));
  }
}

module.exports = InMemoryRepository;

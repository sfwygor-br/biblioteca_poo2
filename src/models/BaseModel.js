class BaseModel {
  constructor(id) {
    this.id = id;
  }

  updateFrom(data) {
    Object.assign(this, data);
  }
}

module.exports = BaseModel;

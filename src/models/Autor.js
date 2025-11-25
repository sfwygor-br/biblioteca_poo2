const BaseModel = require('./BaseModel');

class Autor extends BaseModel {
  constructor({ id, nomeAutor, nacionalidade }) {
    super(id);
    this.nomeAutor = nomeAutor;
    this.nacionalidade = nacionalidade;
  }
}

module.exports = Autor;

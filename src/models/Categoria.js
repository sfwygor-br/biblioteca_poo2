const BaseModel = require('./BaseModel');

class Categoria extends BaseModel {
  constructor({ id, nome, descricao }) {
    super(id);
    this.nome = nome;
    this.descricao = descricao;
  }
}

module.exports = Categoria;

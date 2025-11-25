const BaseModel = require('./BaseModel');

class Exemplar extends BaseModel {
  constructor({ id, idLivro, codigoDeBarras, status }) {
    super(id);
    this.idLivro = idLivro;
    this.codigoDeBarras = codigoDeBarras;
    this.status = status; // disponivel, emprestado, reservado
  }
}

module.exports = Exemplar;

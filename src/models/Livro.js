const BaseModel = require('./BaseModel');

class Livro extends BaseModel {
  constructor({ id, titulo, editora, anoPubli, idCategoria }) {
    super(id);
    this.titulo = titulo;
    this.editora = editora;
    this.anoPubli = anoPubli;
    this.idCategoria = idCategoria;
  }
}

module.exports = Livro;

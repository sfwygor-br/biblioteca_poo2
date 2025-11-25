const BaseModel = require('./BaseModel');

class Emprestimo extends BaseModel {
  constructor({ id, idExemplar, idUsuario, dataEmprestimo, dataDevolucao, dataDevolvido }) {
    super(id);
    this.idExemplar = idExemplar;
    this.idUsuario = idUsuario;
    this.dataEmprestimo = dataEmprestimo;
    this.dataDevolucao = dataDevolucao;
    this.dataDevolvido = dataDevolvido || null;
  }

  marcarDevolvido(data = new Date()) {
    this.dataDevolvido = data.toISOString().substring(0, 10);
  }
}

module.exports = Emprestimo;

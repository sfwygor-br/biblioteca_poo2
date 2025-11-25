const BaseModel = require('./BaseModel');

class Usuario extends BaseModel {
  constructor({ id, nome, telefone, email, cargo }) {
    super(id);
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.cargo = cargo;
  }
}

module.exports = Usuario;

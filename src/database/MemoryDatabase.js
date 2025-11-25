const Autor = require('../models/Autor');
const Categoria = require('../models/Categoria');
const Livro = require('../models/Livro');
const Usuario = require('../models/Usuario');
const Exemplar = require('../models/Exemplar');
const Emprestimo = require('../models/Emprestimo');
const InMemoryRepository = require('../repositories/InMemoryRepository');

class MemoryDatabase {
  constructor() {
    this.autores = new InMemoryRepository((data) => new Autor(data));
    this.categorias = new InMemoryRepository((data) => new Categoria(data));
    this.livros = new InMemoryRepository((data) => new Livro(data));
    this.usuarios = new InMemoryRepository((data) => new Usuario(data));
    this.exemplares = new InMemoryRepository((data) => new Exemplar(data));
    this.emprestimos = new InMemoryRepository((data) => new Emprestimo(data));

    this._seed();
  }

  _seed() {
    const categoriaTecnologia = this.categorias.create({ nome: 'Tecnologia', descricao: 'Livros de TI' });
    const categoriaRomance = this.categorias.create({ nome: 'Romance', descricao: 'Histórias de amor' });

    const autor1 = this.autores.create({ nome: 'Ada Lovelace', nacionalidade: 'Britânica' });
    const autor2 = this.autores.create({ nome: 'Machado de Assis', nacionalidade: 'Brasileira' });

    const livro1 = this.livros.create({
      titulo: 'Introdução à Programação',
      edicao: '1ª',
      anoPublicacao: 2020,
      idCategoria: categoriaTecnologia.id,
    });

    const livro2 = this.livros.create({
      titulo: 'Dom Casmurro',
      edicao: '3ª',
      anoPublicacao: 1899,
      idCategoria: categoriaRomance.id,
    });

    this.exemplares.create({ idLivro: livro1.id, codigoDeBarras: 'EX-001', status: 'disponivel' });
    this.exemplares.create({ idLivro: livro1.id, codigoDeBarras: 'EX-002', status: 'disponivel' });
    this.exemplares.create({ idLivro: livro2.id, codigoDeBarras: 'EX-003', status: 'emprestado' });

    this.usuarios.create({ nome: 'Bibliotecária', telefone: '1111-1111', email: 'biblio@escola.com', cargo: 'admin' });
    this.usuarios.create({ nome: 'Aluno', telefone: '2222-2222', email: 'aluno@escola.com', cargo: 'aluno' });
  }
}

module.exports = new MemoryDatabase();

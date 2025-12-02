const mysql = require('mysql2/promise');
const MySqlRepository = require('../repositories/MySqlRepository');
const LivroAutorRepository = require('../repositories/LivroAutorRepository');

class MySqlDatabase {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST || '34.2.171.188',
      user: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || 'SenhaForte123',
      database: process.env.DB_NAME || 'biblioteca',
      port: Number(process.env.DB_PORT) || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      namedPlaceholders: true,
    });

    this.autores = new MySqlRepository(this.pool, 'autor', 'idautor');
    this.categorias = new MySqlRepository(this.pool, 'categoria', 'idcategoria');
    this.livros = new MySqlRepository(this.pool, 'livro', 'idlivro');
    this.usuarios = new MySqlRepository(this.pool, 'usuario', 'idusuario');
    this.exemplares = new MySqlRepository(this.pool, 'exemplar', 'idexemplar');
    this.emprestimos = new MySqlRepository(this.pool, 'emprestimo', 'idemprestimo');
    this.livrosAutores = new LivroAutorRepository(this.pool);
  }
}

module.exports = new MySqlDatabase();

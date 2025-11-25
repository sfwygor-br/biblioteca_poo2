class LivroAutorRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async list() {
    const [rows] = await this.pool.query(`
      SELECT la.idLivro, la.idAutor, l.titulo AS tituloLivro, a.nome AS nomeAutor
      FROM livro_autor la
      LEFT JOIN livro l ON l.idlivro = la.idLivro
      LEFT JOIN autor a ON a.idautor = la.idAutor
      ORDER BY l.titulo, a.nome
    `);
    return rows;
  }

  async create({ idLivro, idAutor }) {
    if (!idLivro || !idAutor) return null;
    await this.pool.execute('INSERT INTO livro_autor (idLivro, idAutor) VALUES (?, ?)', [idLivro, idAutor]);
    return this.findByIds(idLivro, idAutor);
  }

  async findByIds(idLivro, idAutor) {
    const [rows] = await this.pool.query(
      `SELECT la.idLivro, la.idAutor, l.titulo AS tituloLivro, a.nome AS nomeAutor
       FROM livro_autor la
       LEFT JOIN livro l ON l.idlivro = la.idLivro
       LEFT JOIN autor a ON a.idautor = la.idAutor
       WHERE la.idLivro = ? AND la.idAutor = ?`,
      [idLivro, idAutor]
    );
    return rows[0] || null;
  }

  async delete(idLivro, idAutor) {
    const [result] = await this.pool.execute('DELETE FROM livro_autor WHERE idLivro = ? AND idAutor = ?', [idLivro, idAutor]);
    return result.affectedRows > 0;
  }
}

module.exports = LivroAutorRepository;

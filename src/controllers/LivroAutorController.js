class LivroAutorController {
  constructor(repository) {
    this.repository = repository;
  }

  list = async (req, res) => {
    const data = await this.repository.list();
    res.json(data);
  };

  create = async (req, res) => {
    const created = await this.repository.create(req.body);
    if (!created) return res.status(400).json({ message: 'Dados inválidos para vincular livro e autor' });
    res.status(201).json(created);
  };

  delete = async (req, res) => {
    const { idLivro, idAutor } = req.body;
    const removed = await this.repository.delete(idLivro, idAutor);
    if (!removed) return res.status(404).json({ message: 'Associação não encontrada' });
    res.status(204).end();
  };
}

module.exports = LivroAutorController;

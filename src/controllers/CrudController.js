class CrudController {
  constructor(repository) {
    this.repository = repository;
  }

  list = async (req, res) => {
    const data = await this.repository.list();
    res.json(data);
  };

  getById = async (req, res) => {
    const entity = await this.repository.findById(req.params.id);
    if (!entity) return res.status(404).json({ message: 'Não encontrado' });
    res.json(entity);
  };

  create = async (req, res) => {
    const entity = await this.repository.create(req.body);
    res.status(201).json(entity);
  };

  update = async (req, res) => {
    const entity = await this.repository.update(req.params.id, req.body);
    if (!entity) return res.status(404).json({ message: 'Não encontrado' });
    res.json(entity);
  };

  delete = async (req, res) => {
    const deleted = await this.repository.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Não encontrado' });
    res.status(204).end();
  };
}

module.exports = CrudController;

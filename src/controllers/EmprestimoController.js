const CrudController = require('./CrudController');

class EmprestimoController extends CrudController {
  constructor(repository, exemplarRepository) {
    super(repository);
    this.exemplarRepository = exemplarRepository;
  }

  criarEmprestimo = async (req, res) => {
    const exemplar = await this.exemplarRepository.findById(req.body.idExemplar);
    if (!exemplar) return res.status(400).json({ message: 'Exemplar não existe' });
    if (exemplar.status === 'emprestado') return res.status(400).json({ message: 'Exemplar já emprestado' });

    await this.exemplarRepository.update(exemplar.id, { status: 'emprestado' });

    const emprestimo = await this.repository.create({
      ...req.body,
      dataEmprestimo: req.body.dataEmprestimo || new Date().toISOString().substring(0, 10),
    });
    res.status(201).json(emprestimo);
  };

  devolver = async (req, res) => {
    const emprestimo = await this.repository.findById(req.params.id);
    if (!emprestimo) return res.status(404).json({ message: 'Empréstimo não encontrado' });

    const hoje = new Date().toISOString().substring(0, 10);
    await this.repository.update(emprestimo.id, { dataDevolvido: hoje });
    await this.exemplarRepository.update(emprestimo.idExemplar, { status: 'disponivel' });

    const atualizado = await this.repository.findById(req.params.id);

    res.json(atualizado);
  };
}

module.exports = EmprestimoController;

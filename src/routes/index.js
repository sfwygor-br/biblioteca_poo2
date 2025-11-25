const express = require('express');
const CrudController = require('../controllers/CrudController');
const EmprestimoController = require('../controllers/EmprestimoController');
const LivroAutorController = require('../controllers/LivroAutorController');
const db = require('../database/MySqlDatabase');

const router = express.Router();

const autorController = new CrudController(db.autores);
const categoriaController = new CrudController(db.categorias);
const livroController = new CrudController(db.livros);
const usuarioController = new CrudController(db.usuarios);
const exemplarController = new CrudController(db.exemplares);
const emprestimoController = new EmprestimoController(db.emprestimos, db.exemplares);
const livroAutorController = new LivroAutorController(db.livrosAutores);

function buildCrudRoutes(path, controller) {
  router.get(path, controller.list);
  router.get(`${path}/:id`, controller.getById);
  router.post(path, controller.create);
  router.put(`${path}/:id`, controller.update);
  router.delete(`${path}/:id`, controller.delete);
}

buildCrudRoutes('/autores', autorController);
buildCrudRoutes('/categorias', categoriaController);
buildCrudRoutes('/livros', livroController);
buildCrudRoutes('/usuarios', usuarioController);
buildCrudRoutes('/exemplares', exemplarController);

router.get('/emprestimos', emprestimoController.list);
router.get('/emprestimos/:id', emprestimoController.getById);
router.post('/emprestimos', emprestimoController.criarEmprestimo);
router.put('/emprestimos/:id', emprestimoController.update);
router.post('/emprestimos/:id/devolver', emprestimoController.devolver);
router.delete('/emprestimos/:id', emprestimoController.delete);

router.get('/livros-autores', livroAutorController.list);
router.post('/livros-autores', livroAutorController.create);
router.delete('/livros-autores', livroAutorController.delete);

module.exports = router;

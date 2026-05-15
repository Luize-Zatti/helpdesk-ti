const { Router } = require('express');
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');
const permissao = require('../middlewares/permissaoMiddleware');

const router = Router();

// Listar ativos — usado nos dropdowns. Qualquer autenticado pode acessar.
router.get('/', authMiddleware, usuarioController.listar);

// Listar todos (ativos e inativos) — apenas admin
router.get('/todos', authMiddleware, permissao(['admin']), usuarioController.listarTodos);

// Buscar por ID — apenas admin
router.get('/:id', authMiddleware, permissao(['admin']), usuarioController.buscarPorId);

// Criar, atualizar, inativar — apenas admin
router.post('/', authMiddleware, permissao(['admin']), usuarioController.criar);
router.put('/:id', authMiddleware, permissao(['admin']), usuarioController.atualizar);
router.delete('/:id', authMiddleware, permissao(['admin']), usuarioController.inativar);

module.exports = router;
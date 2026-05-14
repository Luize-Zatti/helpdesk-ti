const { Router } = require('express');
const chamadoController = require('../controllers/chamadoController');

const router = Router();

router.get('/', chamadoController.listar);
router.get('/:id', chamadoController.buscarPorId);
router.post('/', chamadoController.criar);
router.put('/:id', chamadoController.atualizar);
router.delete('/:id', chamadoController.deletar);

module.exports = router;
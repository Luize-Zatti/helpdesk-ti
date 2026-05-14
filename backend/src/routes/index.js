const { Router } = require('express');
const chamadoRoutes = require('./chamadoRoutes');
const categoriaRoutes = require('./categoriaRoutes');
const usuarioRoutes = require('./usuarioRoutes');
const authRoutes = require('./authRoutes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/chamados', chamadoRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/usuarios', usuarioRoutes);

module.exports = router;

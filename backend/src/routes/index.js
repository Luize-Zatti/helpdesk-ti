const { Router } = require('express');
const chamadoRoutes = require('./chamadoRoutes');

const router = Router();

router.use('/chamados', chamadoRoutes);

module.exports = router;
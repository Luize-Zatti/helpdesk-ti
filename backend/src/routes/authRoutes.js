const { Router } = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.post('/cadastrar', authController.cadastrar);
router.post('/login', authController.login);
router.get('/perfil', authMiddleware, authController.perfil);

module.exports = router;
const { Usuario } = require('../models');

module.exports = {
  async listar(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        where: { ativo: true },
        attributes: ['id', 'nome', 'email', 'perfil'],
        order: [['nome', 'ASC']]
      });
      return res.json(usuarios);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }
};
const { Categoria } = require('../models');

module.exports = {
  async listar(req, res) {
    try {
      const categorias = await Categoria.findAll({
        where: { ativo: true },
        order: [['nome', 'ASC']]
      });
      return res.json(categorias);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }
};
const { Chamado, Categoria, Equipamento, Usuario } = require('../models');

const include = [
  { model: Categoria, as: 'categoria' },
  { model: Equipamento, as: 'equipamento' },
  { model: Usuario, as: 'solicitante', attributes: ['id', 'nome', 'email'] },
  { model: Usuario, as: 'tecnico', attributes: ['id', 'nome', 'email'] }
];

module.exports = {
  async listar(req, res) {
    try {
      const chamados = await Chamado.findAll({
        include,
        order: [['created_at', 'DESC']]
      });
      return res.json(chamados);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const chamado = await Chamado.findByPk(id, { include });

      if (!chamado) {
        return res.status(404).json({ erro: 'Chamado não encontrado' });
      }

      return res.json(chamado);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async criar(req, res) {
    try {
      const { titulo, descricao, categoria_id, equipamento_id, solicitante_id, prioridade } = req.body;

      if (!titulo || !descricao || !categoria_id || !solicitante_id) {
        return res.status(400).json({ erro: 'Campos obrigatórios: titulo, descricao, categoria_id, solicitante_id' });
      }

      const chamado = await Chamado.create({
        titulo,
        descricao,
        categoria_id,
        equipamento_id,
        solicitante_id,
        prioridade: prioridade || 'media',
        status: 'aberto'
      });

      const chamadoCompleto = await Chamado.findByPk(chamado.id, { include });
      return res.status(201).json(chamadoCompleto);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { titulo, descricao, categoria_id, equipamento_id, prioridade, tecnico_id, status, solucao } = req.body;

      const chamado = await Chamado.findByPk(id);
      if (!chamado) {
        return res.status(404).json({ erro: 'Chamado não encontrado' });
      }

      if (status === 'concluido' && chamado.status !== 'concluido') {
        chamado.concluido_em = new Date();
      }

      await chamado.update({
        titulo: titulo ?? chamado.titulo,
        descricao: descricao ?? chamado.descricao,
        categoria_id: categoria_id ?? chamado.categoria_id,
        equipamento_id: equipamento_id ?? chamado.equipamento_id,
        prioridade: prioridade ?? chamado.prioridade,
        tecnico_id: tecnico_id ?? chamado.tecnico_id,
        status: status ?? chamado.status,
        solucao: solucao ?? chamado.solucao
      });

      const chamadoAtualizado = await Chamado.findByPk(id, { include });
      return res.json(chamadoAtualizado);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const chamado = await Chamado.findByPk(id);

      if (!chamado) {
        return res.status(404).json({ erro: 'Chamado não encontrado' });
      }

      await chamado.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }
};
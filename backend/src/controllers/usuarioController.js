const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');

function sanitizar(usuario) {
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    perfil: usuario.perfil,
    ativo: usuario.ativo,
    created_at: usuario.created_at,
    updated_at: usuario.updated_at
  };
}

module.exports = {
  async listar(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        where: { ativo: true },
        attributes: ['id', 'nome', 'email', 'perfil', 'ativo'],
        order: [['nome', 'ASC']]
      });
      return res.json(usuarios);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async listarTodos(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        attributes: ['id', 'nome', 'email', 'perfil', 'ativo', 'created_at'],
        order: [['nome', 'ASC']]
      });
      return res.json(usuarios);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id, {
        attributes: ['id', 'nome', 'email', 'perfil', 'ativo']
      });

      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      return res.json(usuario);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async criar(req, res) {
    try {
      const { nome, email, senha, perfil } = req.body;

      if (!nome || !email || !senha || !perfil) {
        return res.status(400).json({ erro: 'Nome, e-mail, senha e perfil são obrigatórios' });
      }

      if (senha.length < 6) {
        return res.status(400).json({ erro: 'A senha deve ter no mínimo 6 caracteres' });
      }

      if (!['admin', 'tecnico', 'solicitante'].includes(perfil)) {
        return res.status(400).json({ erro: 'Perfil inválido' });
      }

      const existe = await Usuario.findOne({ where: { email } });
      if (existe) {
        return res.status(400).json({ erro: 'E-mail já cadastrado' });
      }

      const senhaHash = await bcrypt.hash(senha, 10);

      const usuario = await Usuario.create({
        nome,
        email,
        senha: senhaHash,
        perfil,
        ativo: true
      });

      return res.status(201).json(sanitizar(usuario));
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, perfil, ativo, senha } = req.body;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      if (email && email !== usuario.email) {
        const existe = await Usuario.findOne({ where: { email } });
        if (existe) {
          return res.status(400).json({ erro: 'E-mail já cadastrado' });
        }
      }

      if (perfil && !['admin', 'tecnico', 'solicitante'].includes(perfil)) {
        return res.status(400).json({ erro: 'Perfil inválido' });
      }

      const dadosAtualizacao = {
        nome: nome ?? usuario.nome,
        email: email ?? usuario.email,
        perfil: perfil ?? usuario.perfil,
        ativo: ativo ?? usuario.ativo
      };

      if (senha) {
        if (senha.length < 6) {
          return res.status(400).json({ erro: 'A senha deve ter no mínimo 6 caracteres' });
        }
        dadosAtualizacao.senha = await bcrypt.hash(senha, 10);
      }

      await usuario.update(dadosAtualizacao);

      return res.json(sanitizar(usuario));
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async inativar(req, res) {
    try {
      const { id } = req.params;

      if (Number(id) === req.usuarioId) {
        return res.status(400).json({ erro: 'Você não pode inativar a si mesmo' });
      }

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      await usuario.update({ ativo: false });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }
};
const sequelize = require('../config/connection');

const Usuario = require('./Usuario');
const Categoria = require('./Categoria');
const Equipamento = require('./Equipamento');
const Chamado = require('./Chamado');
const Comentario = require('./Comentario');
const Participante = require('./Participante');
const Historico = require('./Historico');

// Relações de Chamado
Chamado.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' });
Chamado.belongsTo(Equipamento, { foreignKey: 'equipamento_id', as: 'equipamento' });
Chamado.belongsTo(Usuario, { foreignKey: 'solicitante_id', as: 'solicitante' });
Chamado.belongsTo(Usuario, { foreignKey: 'tecnico_id', as: 'tecnico' });
Chamado.hasMany(Comentario, { foreignKey: 'chamado_id', as: 'comentarios' });
Chamado.hasMany(Participante, { foreignKey: 'chamado_id', as: 'participantes' });
Chamado.hasMany(Historico, { foreignKey: 'chamado_id', as: 'historico' });

// Relações de Comentario
Comentario.belongsTo(Chamado, { foreignKey: 'chamado_id', as: 'chamado' });
Comentario.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

// Relações de Participante
Participante.belongsTo(Chamado, { foreignKey: 'chamado_id', as: 'chamado' });
Participante.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
Participante.belongsTo(Usuario, { foreignKey: 'adicionado_por_id', as: 'adicionadoPor' });

// Relações de Historico
Historico.belongsTo(Chamado, { foreignKey: 'chamado_id', as: 'chamado' });
Historico.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

module.exports = {
  sequelize,
  Usuario,
  Categoria,
  Equipamento,
  Chamado,
  Comentario,
  Participante,
  Historico
};
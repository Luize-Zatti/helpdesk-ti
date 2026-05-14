const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Chamado extends Model {}

Chamado.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('aberto', 'em_atendimento', 'aguardando_solicitante', 'concluido', 'cancelado'),
    defaultValue: 'aberto'
  },
  prioridade: {
    type: DataTypes.ENUM('baixa', 'media', 'alta', 'urgente'),
    defaultValue: 'media'
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  equipamento_id: DataTypes.INTEGER,
  solicitante_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tecnico_id: DataTypes.INTEGER,
  solucao: DataTypes.TEXT,
  concluido_em: DataTypes.DATE
}, {
  sequelize,
  modelName: 'Chamado',
  tableName: 'chamados'
});

module.exports = Chamado;
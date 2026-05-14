const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Historico extends Model {}

Historico.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  chamado_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tipo_acao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  valor_anterior: DataTypes.STRING,
  valor_novo: DataTypes.STRING,
  observacao: DataTypes.TEXT
}, {
  sequelize,
  modelName: 'Historico',
  tableName: 'historico'
});

module.exports = Historico;
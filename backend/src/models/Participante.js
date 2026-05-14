const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Participante extends Model {}

Participante.init({
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
  adicionado_por_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Participante',
  tableName: 'participantes'
});

module.exports = Participante;
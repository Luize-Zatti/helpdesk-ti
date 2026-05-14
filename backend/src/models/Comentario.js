const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Comentario extends Model {}

Comentario.init({
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
  mensagem: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Comentario',
  tableName: 'comentarios'
});

module.exports = Comentario;
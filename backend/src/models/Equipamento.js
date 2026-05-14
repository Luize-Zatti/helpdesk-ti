const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Equipamento extends Model {}

Equipamento.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  patrimonio: DataTypes.STRING,
  descricao: DataTypes.TEXT,
  tipo: DataTypes.STRING,
  localizacao: DataTypes.STRING,
  usuario_responsavel_id: DataTypes.INTEGER,
  ativo: DataTypes.BOOLEAN
}, {
  sequelize,
  modelName: 'Equipamento',
  tableName: 'equipamentos'
});

module.exports = Equipamento;
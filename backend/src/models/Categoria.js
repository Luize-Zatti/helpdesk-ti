const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Categoria extends Model {}

Categoria.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: DataTypes.STRING,
  descricao: DataTypes.TEXT,
  ativo: DataTypes.BOOLEAN
}, {
  sequelize,
  modelName: 'Categoria',
  tableName: 'categorias'
});

module.exports = Categoria;
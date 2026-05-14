const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Usuario extends Model {}

Usuario.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  senha: DataTypes.STRING,
  perfil: DataTypes.ENUM('admin', 'tecnico', 'solicitante'),
  ativo: DataTypes.BOOLEAN
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'usuarios'
});

module.exports = Usuario;
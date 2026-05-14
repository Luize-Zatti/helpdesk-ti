const { Sequelize } = require('sequelize');
const config = require('./database').development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    define: config.define,
    logging: false
  }
);

module.exports = sequelize;
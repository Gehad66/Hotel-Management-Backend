const config = require('../config/config');
const Sequelize  = require('sequelize');
 const sequelize = new Sequelize({
  'username': config.username,
  'password': config.password,
  'database': config.database,
  'host': config.db_host,
  'dialect': config.dialect,
  dialectModule: require('mysql2'),
  define: {
    timestamps: false,
    freezeTableName: true
  }
});
sequelize.sync();

module.exports = sequelize;
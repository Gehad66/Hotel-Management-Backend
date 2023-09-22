const config = require('../config/config');
const Sequelize  = require('sequelize');
 const sequelize = new Sequelize({
  'username': config.username,
  'password': config.password,
  'database': config.database,
  'db_host': config.db_host,
  'dialect': config.dialect,
  define: {
    timestamps: false,
    freezeTableName: true
  }
});
sequelize.sync();

module.exports = sequelize;
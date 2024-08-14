const { Sequelize } = require("sequelize");

const  config  = require('./config');


const sequelize = new Sequelize(config.production.url,{
    dialect: 'mysql',
  logging: true
});

module.exports = sequelize;

const { Sequelize } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  "mysql://userDBGG:Oov1jWNqkiWzKIcXd4so@191.101.234.60:3306/BDSGG"
);

module.exports = sequelize;

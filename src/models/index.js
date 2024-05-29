const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const User = require("./user")(sequelize, DataTypes);
const Role = require("./role")(sequelize, DataTypes);
const Table = require("./table")(sequelize, DataTypes);
const Order = require("./order")(sequelize, DataTypes);
const State = require("./state")(sequelize, DataTypes);
// User and Role relationship
User.belongsTo(Role, { foreignKey: "id_rol" });
Role.hasMany(User, { foreignKey: "id_rol" });

// Table and User relationship
Table.belongsTo(User, { as: "mozo", foreignKey: "id_usuario" });
User.hasMany(Table, { foreignKey: "id_usuario" });

// Table and State relationship
Table.belongsTo(State, { foreignKey: "id_estado" });
State.hasMany(Table, { foreignKey: "id_estado" });

// Order and User relationship
Order.belongsTo(User, { foreignKey: "id_usuario" });
User.hasMany(Order, { foreignKey: "id_usuario" });

// Order and Table relationship
Order.belongsTo(Table, { foreignKey: "id_mesa" });
Table.hasMany(Order, { foreignKey: "id_mesa" });

module.exports = {
  sequelize,
  User,
  Role,
  Table,
  Order,
  State,
};

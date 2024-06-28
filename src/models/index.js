const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const User = require("./user")(sequelize, DataTypes);
const Role = require("./role")(sequelize, DataTypes);
const Table = require("./table")(sequelize, DataTypes);
const Order = require("./order")(sequelize, DataTypes);
const State = require("./state")(sequelize, DataTypes);
const workday = require("./workday")(sequelize, DataTypes);
const orderProduct = require("./orderProduct")(sequelize, DataTypes);


// User and Role relationship
User.belongsTo(Role, { foreignKey: "id_rol" });
Role.hasMany(User, { foreignKey: "id_rol" });

// Table and User relationship
Table.belongsTo(User, { foreignKey: "id_user" });
User.hasMany(Table, { foreignKey: "id_user" });

// Table and State relationship
Table.belongsTo(State, { foreignKey: "id_state" });
State.hasMany(Table, { foreignKey: "id_state" });

// Order and User relationship
Order.belongsTo(User, { foreignKey: "id_user" });
User.hasMany(Order, { foreignKey: "id_user" });

// Order and Table relationship
Order.belongsTo(Table, { foreignKey: "id_mesa" });
Table.hasMany(Order, { foreignKey: "id_mesa" });

//user and workday relationship
User.hasMany(workday, { foreignKey: "id_user" });
workday.belongsTo(User, { foreignKey: "id_user" });

//order and state
Order.belongsTo(State, { foreignKey: "id_state" });
State.hasMany(Order, { foreignKey: "id_state" });

Order.hasMany(orderProduct, { foreignKey: "id_order" });

orderProduct.belongsTo(Order, { foreignKey: "id_order" });

module.exports = {
  sequelize,
  User,
  Role,
  Table,
  Order,
  State,
  workday,
  orderProduct
};

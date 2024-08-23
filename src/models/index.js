const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const caja = require("./caja");

const User = require("./user")(sequelize, DataTypes);
const Role = require("./role")(sequelize, DataTypes);
const Table = require("./table")(sequelize, DataTypes);
const Order = require("./order")(sequelize, DataTypes);
const State = require("./state")(sequelize, DataTypes);
const Workday = require("./workday")(sequelize, DataTypes);
const OrderProduct = require("./orderProduct")(sequelize, DataTypes);
const Negocio = require("./negocio")(sequelize, DataTypes);
const Sucursal = require("./sucursal")(sequelize, DataTypes);
const Sales = require("./sales")(sequelize, DataTypes);
const Caja = require ("./caja")(sequelize, DataTypes);
const Gasto = require ("./gasto")(sequelize, DataTypes);


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

// User and Workday relationship
User.hasMany(Workday, { foreignKey: "id_user" });
Workday.belongsTo(User, { foreignKey: "id_user" });

// Order and State relationship
Order.belongsTo(State, { foreignKey: "id_state" });
State.hasMany(Order, { foreignKey: "id_state" });

// Order and OrderProduct relationship
Order.hasMany(OrderProduct, { foreignKey: "id_order" });
OrderProduct.belongsTo(Order, { foreignKey: "id_order" });

// Negocio and Sucursal relationship
Negocio.hasMany(Sucursal, { foreignKey: "negocioId" });
Sucursal.belongsTo(Negocio, { foreignKey: "negocioId" });

// Sucursal and User relationship
Sucursal.hasMany(User, { foreignKey: "sucursalId" });
User.belongsTo(Sucursal, { foreignKey: "sucursalId" });

// Sucursal and Order relationship
Sucursal.hasMany(Order, { foreignKey: "sucursalId" });
Order.belongsTo(Sucursal, { foreignKey: "sucursalId" });

// Sales and Order relationship
Sales.belongsTo(Order, { foreignKey: "id_order" });
Order.hasMany(Sales, { foreignKey: "id_order" });

Caja.belongsTo(User, {foreignKey:"id_user"});
User.hasMany(Caja,{foreignKey: 'id_user'});

Caja.belongsTo(Sucursal, {foreignKey:"SucursalId"})
Sucursal.hasMany(Caja,{foreignKey:"SucursalId"})

Gasto.belongsTo(User, {foreignKey:"userId"})


module.exports = {
  sequelize,
  User,
  Role,
  Table,
  Order,
  State,
  Workday,
  OrderProduct,
  Negocio,
  Sucursal,
  Sales,
  Caja,
  Gasto
};

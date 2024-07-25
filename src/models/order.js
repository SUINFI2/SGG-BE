const { ref } = require("joi");

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    id_order: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sucursalId: {
      type: DataTypes.STRING(252),
      allowNull: false
    },
    id_mesa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_state: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    typeShipping: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comentario: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    personas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    clientes: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
  return Order;
};

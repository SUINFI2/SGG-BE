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
    id_sucursal: {
      type: DataTypes.STRING(252),
      allowNull: false,
      references: {
        model: 'Sucursal',
        key: 'id'
      }
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
    }
  });
  return Order;
};

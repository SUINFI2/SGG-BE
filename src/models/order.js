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
    id_mesa: {
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

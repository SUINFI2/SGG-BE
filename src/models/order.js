module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    id_pedido: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_mesa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Order;
};

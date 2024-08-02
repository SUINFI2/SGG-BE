module.exports = (sequelize, DataTypes) => {

  const OrderProduct = sequelize.define("OrderProduct", {
    id_orderProduct: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_prduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    cnt: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    cuentaSolicitada: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  });
  return OrderProduct;
};

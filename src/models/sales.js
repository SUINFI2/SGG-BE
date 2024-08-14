module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define("Sales", {
    id_sales: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_cuenta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  });
  return Sales;
};

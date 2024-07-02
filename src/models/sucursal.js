module.exports = (sequelize, DataTypes) => {
  const Sucursal = sequelize.define("Sucursal", {
    id_sucursal: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_negocio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Sucursal;
};

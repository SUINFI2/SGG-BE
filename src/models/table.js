module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define("Table", {
    id_mesa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_sucursal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_state: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Table;
};

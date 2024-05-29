module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define("Table", {
    id_mesa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Table;
};

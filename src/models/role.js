module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Role;
};

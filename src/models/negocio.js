module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Negocio", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Role;
};

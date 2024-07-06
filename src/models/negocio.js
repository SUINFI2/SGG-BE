module.exports = (sequelize, DataTypes) => {
  const Negocio = sequelize.define("Negocio", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    nombre: {
      allowNull: false,
      type: DataTypes.STRING(128),
      unique: true
    },
    direccion: {
      allowNull: true,
      type: DataTypes.STRING(256)
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    }
  });
  return Negocio;
};

module.exports = (sequelize, DataTypes) => {
 
  const Sucursal = sequelize.define("Sucursal", {
    id_sucursal: {
      type: DataTypes.STRING(252),
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    id_negocio: {
      type: DataTypes.STRING(252),
      allowNull: false,
    },
    nombre: {
      allowNull: false,
      type: DataTypes.STRING(256),
    },
    direccion: {
      allowNull: false,
      type: DataTypes.STRING(512),
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    },
  });
  return Sucursal;
};

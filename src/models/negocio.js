module.exports = (sequelize, DataTypes) => {
  const Negocio = sequelize.define("Negocio", {
    id_negocio: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: DataTypes.STRING(36)
    },
    nombre: {
      allowNull: false,
      type: DataTypes.STRING(128),
      unique: true
    },
    direccion: {
      allowNull: false,
      type: DataTypes.STRING(256),
      unique: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: sequelize.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at',
      defaultValue: sequelize.NOW
    }

  });
  return Negocio;
};

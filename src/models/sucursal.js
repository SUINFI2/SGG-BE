module.exports = (sequelize, DataTypes) => {
  const Sucursal = sequelize.define("Sucursal", {
    id_sucursal: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.STRING(36),
      unique: true
    },
    nombre: {
      allowNull: false,
      type: DataTypes.STRING(256),
    },
    direccion: {
      allowNull: false,
      type: DataTypes.STRING(512), unique: true

    },
    id_negocio: {
      field: 'id_negocio',
      allowNull: false,
      type: DataTypes.STRING(36),
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
  return Sucursal;
};

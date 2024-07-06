module.exports = (sequelize, DataTypes) => {
 
  const Sucursal = sequelize.define("Sucursal", {
    id: {
      allowNull: false,
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
      type: DataTypes.STRING(512),
      unique: true
    },
    negocioId: {
      allowNull: false,
      type: DataTypes.STRING(36),
      field: 'negocio_id',
      references: {
        model: 'Negocios',
        key: 'id'
      }
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
  }, {
    tableName: 'Sucursals',
  });

  return Sucursal;
};

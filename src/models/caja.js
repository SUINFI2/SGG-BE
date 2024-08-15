module.exports = (sequelize, DataTypes) => {
    const Caja = sequelize.define("Caja", {
      id_caja: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id_user',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      SucursalId: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
          model: 'Sucursals',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      monto_inicial: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      monto_caja: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      fecha_apertura: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fecha_cierre: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: 'Cajas',
      timestamps: true, // Para habilitar createdAt y updatedAt
    });
    return Caja;
  };
  
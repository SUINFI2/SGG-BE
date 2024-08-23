
module.exports = (Sequelize, DataTypes) => {
 
  const Gasto = Sequelize.define("Gasto", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id_user',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    codigoAsiento: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    comprobante: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    },
  });

  return Gasto;
};


module.exports = (Sequelize, DataTypes) => {
 
  const categoriaGastos = Sequelize.define("categoriaGastos", {id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  negocioId: {
    type: DataTypes.STRING(36), 
    allowNull: false,
    references: {
      model: 'Negocios',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  nombre: {
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
  }

},
    
);

  return categoriaGastos;
};

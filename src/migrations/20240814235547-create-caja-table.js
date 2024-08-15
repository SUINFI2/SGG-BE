'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cajas', {
      id_caja: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id_user',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      SucursalId: {
        type: Sequelize.STRING(36),  // Cambié a STRING(36) para que coincida con el tipo de dato de 'id' en 'Sucursals'
        allowNull: false,
        references: {
          model: 'Sucursals',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      monto_inicial: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      monto_caja: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      fecha_apertura: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fecha_cierre: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
};

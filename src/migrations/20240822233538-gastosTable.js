'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Gastos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id_user',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      codigoAsiento: {
        type: Sequelize.STRING(12),
        allowNull: false,
      },
      categoria: {
        type: Sequelize.STRING(12),
        allowNull: false,
      },
      tipo: {
        type: Sequelize.STRING(12),
        allowNull: false,
      },
      comprobante: {
        type: Sequelize.STRING(12),
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

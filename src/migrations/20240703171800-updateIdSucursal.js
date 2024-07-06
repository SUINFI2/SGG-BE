'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Sucursales", "id_sucursal");
    await queryInterface.addColumn("Sucursales", "id_sucursal", {
      type: DataTypes.STRING(252),
      allowNull: false,
      primaryKey: true,
      unique: true
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

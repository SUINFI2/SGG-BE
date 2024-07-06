"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   

    await queryInterface.removeColumn("Negocios", "name");
    await queryInterface.addColumn("Negocios", "nombre", {
      type: Sequelize.STRING(128),
      allowNull: false,
    });

    await queryInterface.addColumn("Negocios", "direccion", {
      type: Sequelize.STRING(128),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};

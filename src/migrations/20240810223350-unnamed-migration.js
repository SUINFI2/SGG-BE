'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Negocios", "userId", {
      allowNull: true,
      type: Sequelize.INTEGER,
      field: 'user_id',
      references: {
        model: 'Users',
        key: 'id_user'
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

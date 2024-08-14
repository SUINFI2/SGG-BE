module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Orders', 'id_sucursal', 'sucursalId');
  },
  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

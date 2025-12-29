'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('questions', 'year', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('questions', 'diet', {
      type: Sequelize.ENUM('may', 'november', 'september', 'march'),
      allowNull: true,
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

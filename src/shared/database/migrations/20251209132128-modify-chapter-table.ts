'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.changeColumn('courses_chapters', 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

  
    await queryInterface.changeColumn('courses_chapters', 'sections', {
      type: Sequelize.JSONB,
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

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.changeColumn('questions', 'Course_type', {
      type: Sequelize.ENUM('ATS', 'ICAN', 'Olevel'),
      allowNull: true 
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

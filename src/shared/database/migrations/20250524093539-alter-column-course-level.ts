'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.removeColumn('users', 'courses_interest');

   
    await queryInterface.addColumn('users', 'courses_interest', {
      type: Sequelize.ARRAY(Sequelize.ENUM("ATS", "ICAN", "Olevel", "All_Courses")),
      allowNull: false,
    });

  },

  async down (queryInterface, Sequelize) {
   
    
  }
};

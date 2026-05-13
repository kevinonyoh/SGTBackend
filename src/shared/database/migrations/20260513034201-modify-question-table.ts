'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.renameColumn('questions', 'Course_type', 'course_type');
    
  
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.renameColumn('questions', 'course_type', 'Course_type');
    
    
  }
};
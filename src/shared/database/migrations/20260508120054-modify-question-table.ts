'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('questions', 'Course_type', {
      type: Sequelize.STRING,
      allowNull: true 
    });
    
    
    await queryInterface.addColumn('questions', 'Explanatory_note', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    
   
    await queryInterface.addColumn('questions', 'scenarios', {
      type: Sequelize.JSONB,
      allowNull: true
    });
    
    
    await queryInterface.addColumn('questions', 'index', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    });
    
    
    await queryInterface.addColumn('questions', 'instructions', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    
   
    await queryInterface.addColumn('questions', 'paragraph', {
      type: Sequelize.TEXT,
      allowNull: true
    });

    await queryInterface.removeColumn('courses', 'index')
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

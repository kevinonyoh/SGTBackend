'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.addColumn('questions', 'dependsOnQuestionId', {
      type: Sequelize.UUID,
      allowNull: true,
    });

   
    await queryInterface.addConstraint('questions', {
      fields: ['dependsOnQuestionId'],
      type: 'foreign key',
      name: 'fk_questions_dependsOnQuestionId',
      references: {
        table: 'questions',
        field: 'id',
      },
      onDelete: 'SET NULL', 
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.removeConstraint('questions', 'fk_questions_dependsOnQuestionId');

    await queryInterface.removeColumn('questions', 'dependsOnQuestionId');
  },
};
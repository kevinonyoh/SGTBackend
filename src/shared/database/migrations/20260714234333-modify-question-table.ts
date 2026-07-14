'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.renameColumn('questions', 'dependsOnQuestionId', 'depends_on_question_id');

    await queryInterface.removeConstraint('questions', 'fk_questions_dependsOnQuestionId');
   
    await queryInterface.addConstraint('questions', {
      fields: ['depends_on_question_id'],
      type: 'foreign key',
      name: 'fk_questions_depends_on_question_id',
      references: {
        table: 'questions',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

  },

  down: async (queryInterface, Sequelize) => {
   
    await queryInterface.removeConstraint('questions', 'fk_questions_depends_on_question_id');

    await queryInterface.renameColumn('questions', 'depends_on_question_id', 'dependsOnQuestionId');
    
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
};
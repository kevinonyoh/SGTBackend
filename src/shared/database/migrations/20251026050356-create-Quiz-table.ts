'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('quizzes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      instruction: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      type: {
        type: Sequelize.ENUM('multiple_choice', 'short_answer', 'true_false', 'theory'),
        allowNull: false,
      },

      year: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      
      question_type: {
        type: Sequelize.ENUM('general_question', 'past_question', 'quick_question'),
        allowNull: false,
      },
      
      diet: {
        type: Sequelize.ENUM('may', 'november'),
        allowNull: true,
      },
      
      default: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      
      time_limit: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      
      course_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      
      chapter_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'courses_chapters',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
  
    await queryInterface.dropTable('quizzes');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_quizzes_type";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_quizzes_question_type";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_quizzes_diet";');
  },
};

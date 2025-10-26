'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   
    await queryInterface.createTable('questions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      
      quiz_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'quizzes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      question_content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      image_path: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      
      image_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      
      public_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      
      explanatory_video_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      
      answer_options: {
        type: Sequelize.JSONB,
        allowNull: false,
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

    
    await queryInterface.createTable('quiz_attempts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      quiz_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'quizzes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      attempt_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      score: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      user_answers: {
        type: Sequelize.JSONB,
        allowNull: false,
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
    await queryInterface.dropTable('quiz_attempts');
    await queryInterface.dropTable('questions');
  },
};

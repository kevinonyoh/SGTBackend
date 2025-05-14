'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable("quizzes", {
    
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false
      },

      instruction: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      time_limit: {
        type: Sequelize.INTEGER,
        comment: 'Time limit in minutes'
      },

      number_of_questions: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      type: {
        type: Sequelize.ENUM('multiple_choice', 'true_false', 'short_answer'),
        allowNull: true,
        defaultValue: 'multiple_choice'
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
    
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },

      course_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }




     })


     await queryInterface.createTable("questions", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
    
      quiz_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'quizzes',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
    
      question_content: {
        type: Sequelize.TEXT,
        allowNull: false
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
    
      answer_options: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
    
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
    
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
    })

     await queryInterface.createTable("quiz_attempts", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      quiz_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'quizzes',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },

      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },

      attempt_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      score: {
        type: Sequelize.FLOAT,
        allowNull: false
      },


      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
    
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },

     })

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

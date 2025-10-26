'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
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

      image_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      
      course_type: {
        type: Sequelize.ENUM('ATS', 'ICAN', 'Olevel'),
        allowNull: false,
      },
      
      course_level: {
        type: Sequelize.ENUM('Beginner', 'Intermediate', 'Expert'),
        allowNull: false,
      },
      
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      
      explanatory_video_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
      
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('courses');
  },
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses_chapters', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      
      chapter_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      
      sections: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      
      additional_resources: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('courses_chapters');
  },
};

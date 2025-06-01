'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("courses_chapters", {
      
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      chapter_title: {
        type: Sequelize.STRING,
        allowNull: false
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      public_id: {
        type: Sequelize.STRING,
        allowNull: false
      },

      url: {
        type: Sequelize.STRING,
        allowNull: false
      },

      format: {
        type: Sequelize.STRING,
        allowNull: false
      },

      resource_type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "video"
      },

      duration: {
        type: Sequelize.FLOAT,
        allowNull: false
      },

      additional_resources: {
        type: Sequelize.STRING,
        allowNull: true
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

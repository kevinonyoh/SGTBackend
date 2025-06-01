'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("contents", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      
      slug: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },

      image: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },

      categories: {
        type: Sequelize.ENUM("ATS", "ICAN", "Olevel"),
        allowNull: false
      },

      content: {
        type: Sequelize.TEXT, // ✅ Corrected
        allowNull: false
      },

      date: {
        allowNull: false,
        type: Sequelize.DATE
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
    
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('blogs');
  }
};

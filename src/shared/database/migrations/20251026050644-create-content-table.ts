'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contents', {
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
      
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      categories: {
        type: Sequelize.ENUM('ATS', 'ICAN', 'Olevel'),
        allowNull: false,
      },
      
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      
      date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('contents');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_contents_categories";');
  },
};

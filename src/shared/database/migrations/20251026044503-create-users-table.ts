'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      full_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      
      phone_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      
      courses_interest: {
        type: Sequelize.ARRAY(
          Sequelize.ENUM('ATS', 'ICAN', 'Olevel', 'All_Courses')
        ),
        allowNull: true
      },
      
      activated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      
      password: {
        type: Sequelize.STRING,
        allowNull: true
      },
      
      is_email_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: true
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
    await queryInterface.dropTable('users');
  }
};

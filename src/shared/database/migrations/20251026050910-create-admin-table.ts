'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('admins', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      full_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      
      role: {
        type: Sequelize.ARRAY(
          Sequelize.ENUM('MANAGE_CONTENT', 'MANAGE_COURSES', 'SUPER_ADMIN')
        ),
        allowNull: false,
      },
      
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      
      activated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      
      is_email_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
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
    await queryInterface.dropTable('admins');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_admins_role";');
  },
};

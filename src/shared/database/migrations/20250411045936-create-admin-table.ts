'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
       await queryInterface.createTable("admins", {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
  
        full_name: {
          type: Sequelize.STRING(128),
          allowNull: true,
        },
      
        phone_number: {
          type: Sequelize.STRING(128),
          allowNull: false
         },
      
         email: {
          type: Sequelize.STRING(128),
          allowNull: false,
          unique   : true
         },
         
         role: {
           type: Sequelize.ARRAY(Sequelize.ENUM("MANAGE_CONTENT", "MANAGE_COURSES", "SUPER_ADMIN")),
           allowNull: false
         },
      
         password: {
          type: Sequelize.STRING(128),
          allowNull: true
         },
  
         is_email_verified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
  
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
      
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
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

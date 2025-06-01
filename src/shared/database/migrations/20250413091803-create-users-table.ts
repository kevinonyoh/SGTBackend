'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable("users", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    full_name: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
  
    phone_number: {
      type: Sequelize.STRING(128),
      allowNull: true
     },
  
     email: {
      type: Sequelize.STRING(128),
      allowNull: false,
      unique   : true
     },

     courses_interest: {
       type: Sequelize.ENUM("ATS", "ICAN", "Olevel", "All_Courses"),
       allowNull: true
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

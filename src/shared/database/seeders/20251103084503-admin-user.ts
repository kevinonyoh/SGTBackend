'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash("Admin@123", 10);

    return queryInterface.bulkInsert("admins", [
      {
        id: uuidv4(),
        full_name: "super admin",
        phone_number: "08162092523",
        email: "admin01@sgt.com.ng",
        role: Sequelize.literal(`ARRAY['SUPER_ADMIN']::"enum_admins_role"[]`),
        password,
        is_email_verified: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("admins", { email: "admin01@sgt.com.ng" });
  }
};

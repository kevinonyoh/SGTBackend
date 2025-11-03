'use strict';

import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
function uuidv4() {
  throw new Error("Function not implemented.");
}


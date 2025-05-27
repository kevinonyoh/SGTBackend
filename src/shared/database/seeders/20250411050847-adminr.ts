'use strict';

import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from "bcrypt";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const password = await bcrypt.hash("password12", 10);

      return queryInterface.bulkInsert("admins", [
        {
          id: uuidv4(),
          full_name: "super admin",
          phone_number: "07056163909",
          email: "Disuolaseni@gmail.com",
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

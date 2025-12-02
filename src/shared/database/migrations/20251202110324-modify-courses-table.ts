'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('courses', 'date');
    
    await queryInterface.removeColumn('courses', 'course_level');

    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_courses_course_level";');
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

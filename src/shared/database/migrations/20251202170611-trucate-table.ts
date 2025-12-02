'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  
    const excludedTables = ['admins', 'spatial_ref_sys'];

    const [tables] = await queryInterface.sequelize.query(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
        AND tablename NOT IN ('${excludedTables.join("','")}')
    `);

    for (const { tablename } of tables) {
      console.log(`Truncating table: ${tablename}`);
      await queryInterface.sequelize.query(`
        TRUNCATE TABLE "${tablename}" RESTART IDENTITY CASCADE;
      `);
    }

    console.log('✅ All tables truncated except:', excludedTables);
  },

  async down() {
    console.log('❌ Down migration skipped — truncate cannot be undone.');
  },
};
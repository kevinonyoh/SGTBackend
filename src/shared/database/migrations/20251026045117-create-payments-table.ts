'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payment', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      course_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'courses',  
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      status: {
        type: Sequelize.ENUM('failed', 'pending', 'successful'),
        allowNull: true,
        defaultValue: 'pending'
      },

      tx_ref: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('payment');
  }
};

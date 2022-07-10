'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.addColumn(
        'users', 
        'image_url',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      );
      await queryInterface.removeColumn('users', 'image_id');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'image_url');
  }
};

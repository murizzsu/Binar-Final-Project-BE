'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
        'products',
        'description',
        {
            type: Sequelize.TEXT,
        }
    );
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'products',
      'description',
    );
    }
};
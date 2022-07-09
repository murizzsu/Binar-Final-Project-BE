'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('bids', {
        type: "FOREIGN KEY",
        name: 'FK_user_id_bids',
        fields: ['user_id'],
        references: {
            table: 'users',
            field: 'id'
        },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('bids', 'FK_user_id_bids');
  }
};
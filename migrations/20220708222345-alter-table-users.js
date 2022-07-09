'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('users', {
        type: "FOREIGN KEY",
        name: 'FK_image_id_users',
        fields: ['image_id'],
        references: {
            table: 'images',
            field: 'id'
        },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('users', 'FK_image_id_users');
  }
};
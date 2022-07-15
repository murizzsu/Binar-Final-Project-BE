'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('notifications', {
        type: "FOREIGN KEY",
        name: 'FK_user_id_notifications',
        fields: ['user_id'],
        references: {
            table: 'users',
            field: 'id'
        },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('notifications', 'FK_user_id_notifications');
  }
};
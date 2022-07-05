'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    //  await queryInterface.bulkDelete("products", {});
    await queryInterface.bulkInsert("products", [
      {
        user_id: 1,
        category_id: 1,
        name: "Sepatu",
        price: "150000.1",
        description: "Ini Sepatu Murah",
        sold: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

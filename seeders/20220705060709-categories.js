'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    //  await queryInterface.bulkDelete("categories", {});
     await queryInterface.bulkInsert("categories", [
      {
        id:1,
        name: "Hobi",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:2,
        name: "Kendaraan",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:3,
        name: "Baju",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:4,
        name: "Elektronik",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:5,
        name: "Kesehatan",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
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

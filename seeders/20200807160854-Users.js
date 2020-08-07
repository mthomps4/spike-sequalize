'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "John",
          lastName: "Doe",
          email: "john@test.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Matt",
          lastName: "Thompson",
          email: "matt@echobind.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Mickey",
          lastName: "Martinez",
          email: "Mickey@echobind.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     return await queryInterface.bulkDelete("Users", null, {});
  }
};

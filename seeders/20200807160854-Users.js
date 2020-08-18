'use strict';
// same as App js -- would be a util later. 
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const hashPassword = (plainPassword) => bcrypt.hashSync(plainPassword, salt);

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

    const demoPassword = 'test1234'
    const passwordHash = hashPassword(demoPassword);

    return await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "John",
          lastName: "Doe",
          email: "john@test.com",
          passwordHash: passwordHash,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Matt",
          lastName: "Thompson",
          email: "matt@echobind.com",
          passwordHash: passwordHash,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Mickey",
          lastName: "Martinez",
          email: "Mickey@echobind.com",
          passwordHash: passwordHash,
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

'use strict';

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema === process.env.SCHEMA; // define schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [
      { spotId: 1,
        userId: 1,
        startDate: "2021-11-19",
        endDate: "2021-11-20"
      },
      { spotId: 2,
        userId: 2,
        startDate: "2021-02-19",
        endDate: "2021-02-20"
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "2021-03-19",
        endDate: "2021-03-20"
      }
    ], {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options, null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

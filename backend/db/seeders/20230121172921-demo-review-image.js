'use strict';

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema === process.env.SCHEMA; // define schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    await queryInterface.bulkInsert(options, [
      {
        url: "www.google.com/images",
        reviewId: 1
      },

      {
        url: "www.google.com/images",
        reviewId: 2
      },

      {
        url: "www.google.com/images",
        reviewId: 3
      }
    ])

  },

  async down (queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    return queryInterface.bulkDelete(options, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

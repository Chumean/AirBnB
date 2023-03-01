'use strict';

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
      {
        url: "https://assets2.rockpapershotgun.com/hot-wheels-unleashed-batman.jpg/BROK/resize/1920x1920%3E/format/jpg/quality/80/hot-wheels-unleashed-batman.jpg",
        preview: true,
        spotId: 1
      },
      {
        url: "www.google.com/images",
        preview: true,
        spotId: 2
      },
      {
        url: "www.google.com/images",
        preview: false,
        spotId: 3
      }
    ], {})

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, null, {});

  }
};

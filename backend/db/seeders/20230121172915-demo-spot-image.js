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
        url: "https://res.cloudinary.com/dsu4khzr3/image/upload/v1677728223/batcave_wdsrg4.jpg",
        preview: true,
        spotId: 1
      },
      {
        url: "https://res.cloudinary.com/dsu4khzr3/image/upload/v1677728232/deathstar_xmu9zz.webp",
        preview: true,
        spotId: 2
      },
      {
        url: "https://res.cloudinary.com/dsu4khzr3/image/upload/v1678079825/danny-greenan-highresscreenshot00009_eqmihe.jpg",
        preview: true,
        spotId: 3
      }
    ], {})

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, null, {});

  }
};

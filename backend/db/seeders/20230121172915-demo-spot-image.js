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
        url: "https://res.cloudinary.com/dsu4khzr3/image/upload/c_scale,h_300,w_300/v1677728223/batcave_wdsrg4.jpg",
        preview: true,
        spotId: 1
      },
      {
        url: "https://res.cloudinary.com/dsu4khzr3/image/upload/c_scale,h_300,w_300/v1677728232/deathstar_xmu9zz.webp",
        preview: true,
        spotId: 2
      },
      {
        url: "https://res.cloudinary.com/dsu4khzr3/image/upload/c_scale,h_300,w_300/v1677728355/anastasiya-osichkina-leblancrgb-color-fin2_k6eqmj.jpg",
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

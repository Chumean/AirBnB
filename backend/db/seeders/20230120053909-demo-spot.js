'use strict';


let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "1007 Mountain Drive",
        city: "Gotham",
        state: "New York",
        country: "United States of America",
        lat: 35.4515,
        lng: 82.2871,
        name: "Bat Cave",
        description: "Batman's secret hideout",
        price: 100000,
        previewImage: "https://res.cloudinary.com/dsu4khzr3/image/upload/v1677728223/batcave_wdsrg4.jpg"

      },

      {
        ownerId: 2,
        address: "Outer Space",
        city: "Not applicable",
        state: "Yavin-4",
        country: "Yavin System",
        lat: 38.7645358,
        lng: -122.4730327,
        name: "Death Star",
        description: "Definitely not a moon",
        price: 500000,
        previewImage: "https://res.cloudinary.com/dsu4khzr3/image/upload/v1677728232/deathstar_xmu9zz.webp"

      },

      {
        ownerId: 3,
        address: "Yongen Jaya",
        city: "Yongen-Jaya",
        state: "Tokyo",
        country: "Japan",
        lat: 35.6413,
        lng: 139.6675,
        name: "Cafe LeBlanc",
        description: "Coffee and Curry",
        price: 333,
        previewImage: "https://res.cloudinary.com/dsu4khzr3/image/upload/v1678079825/danny-greenan-highresscreenshot00009_eqmihe.jpg"

      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

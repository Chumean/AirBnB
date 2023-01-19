'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SpotImage.init({
    url: DataTypes.STRING,
    preview: DataTypes.BOOLEAN,
    spotId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SpotImage',
  });
  return SpotImage;
};
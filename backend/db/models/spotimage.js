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
      SpotImage.belongsTo(models.Spot, {foreignKey:'spotId'})
    }
  }
  SpotImage.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preview: DataTypes.BOOLEAN,
    spotId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SpotImage',
  });
  return SpotImage;
};

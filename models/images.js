'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Images.hasOne(models.Users, { 
        as: 'user',
        foreignKey: 'image_id' 
      });
      // define association here
      Images.belongsTo(models.Products, {
        as: 'products',
        foreignKey: "product_id"
      })
    }
  }
  Images.init({
    name: DataTypes.STRING,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Images',
    underscored: true,
  });
  return Images;
};
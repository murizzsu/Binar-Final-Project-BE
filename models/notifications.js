'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      Notifications.belongsTo(models.Bids, {
        as: 'bids',
        foreignKey: 'bid_id' 
      });

      Notifications.belongsTo(models.Products, {
        as: "products",
        foreignKey: "product_id"
      });

      //untuk membuat foreign lihat kolom
      Notifications.belongsTo(models.Users,{
        as: "users",
        foreignKey: "user_id"
      });

      // Notifications.belongsTo(models.Images, {
      //   as: "images",
      //   foreignKey: "product_id"
      // });
    }
  }
  Notifications.init({
    
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    bid_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    message: DataTypes.STRING,
    read: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Notifications',
    underscored: true,
  });
  return Notifications;
};
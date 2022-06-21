'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({Users,Products,Orders}) {
      // define association here
      CartItems.belongsTo(Users,{foreignKey:'user_id'})
      CartItems.belongsTo(Products,{foreignKey:'product_id'})
    }
  }
  CartItems.init({
    product_id: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    user_id: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    status: {
      type:DataTypes.STRING,
      allowNull:false
    },
    quantity:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    total_price:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
  }, {
    sequelize,
    tableName:'cartitems',
    modelName: 'CartItems',
  });
  return CartItems;
}; 
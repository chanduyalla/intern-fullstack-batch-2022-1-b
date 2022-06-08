'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users,Products}) {
      // define association here
      Cart.belongsTo(Users,{foreignKey:'user_id'})
      Cart.belongsTo(Products,{foreignKey:'product_id'})
    }
  }
  Cart.init({
    product_id:{ 
      allowNull:false,
      type:DataTypes.INTEGER
    },
    user_id: {
      allowNull:false,
      type:DataTypes.INTEGER
    },
   quantity:{
      allowNull:false,
      type:DataTypes.INTEGER
  },
  flag:{
    allowNull:false,
    type:DataTypes.STRING
  },
},
   {
    sequelize,
    tableName:'cartitems',
    modelName: 'Cart',
  });
  return Cart;
};
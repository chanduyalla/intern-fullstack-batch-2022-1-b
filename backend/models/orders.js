'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes,DriverSelctdOrd) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users,Products,DriverSelctdOrd}) {
      // define association here
      Orders.belongsTo(Users,{foreignKey:'user_id'});
      Orders.belongsTo(Products,{foreignKey:'product_id'})
      Orders.hasOne(DriverSelctdOrd,{foreignKey:'order_id'})
    }
  }
  Orders.init({
    status:{
      allowNull:false,
      type:DataTypes.STRING
    } ,
    product_id: {
      allowNull:false,
     type:DataTypes.INTEGER
    },
    user_id:{ 
      allowNull:false,
      type:DataTypes.INTEGER
    },
    location_id:{
      allowNull:false,
      type:DataTypes.STRING
    },
    quantity:{
      allowNull:false,
      type:DataTypes.STRING
    },
  }, {
    sequelize,
    tableName:'orders',
    modelName: 'Orders',
  });
  return Orders;
};
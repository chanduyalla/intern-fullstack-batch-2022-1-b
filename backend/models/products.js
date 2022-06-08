'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Categories,Cart,Orders}) {
      // define association here
      Products.belongsTo(Categories,{foreignKey:'category_id'})
      Products.hasMany(Cart,{foreignKey:'product_id'})
      Products.hasMany(Orders,{foreignKey:'product_id'})
    }
  }
  Products.init({
    name: {
      allowNull:false,
      type:DataTypes.STRING
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull:false 
    },
    status:{
      allowNull:false,
     type:DataTypes.STRING
    },
    quantity:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    category_id: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
  },{ 
    sequelize,
    tableName:'products',
    modelName: 'Products',
  });
  return Products;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Products}) {
      // define association here
      Categories.hasMany(Products,{foreignKey:'category_id'})
    }
  }
  Categories.init({
    name:{ 
      allowNull:false,
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    tableName:'categories',
    modelName: 'Categories',
  });
  return Categories;
};
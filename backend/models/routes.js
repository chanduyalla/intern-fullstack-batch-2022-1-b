'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Routes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Routes.init({
    driver_id:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    destination: {
      type:DataTypes.STRING,
      allowNull:false
    },
    oid: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    flag:{
      type:DataTypes.STRING,
      allowNull:false
    },
    distance_in_km:{
      allowNull:false,
      type:DataTypes.DOUBLE
    }
  }, {
    sequelize,
    tableName:'routes',
    modelName: 'Routes',
  });
  return Routes;
};
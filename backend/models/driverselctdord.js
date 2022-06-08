'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DriverSelctdOrd extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users,Orders}) {
      // define association here
      DriverSelctdOrd.belongsTo(Users,{foreignKey:'driver_id'})
      DriverSelctdOrd.belongsTo(Orders,{foreignKey:'order_id'})
    }
  }
  DriverSelctdOrd.init({
    order_id: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    driver_id: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    remarks: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:'driverselectedorders',
    modelName: 'DriverSelctdOrd',
  });
  return DriverSelctdOrd;
};
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('routes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      driver_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      destination: {
        type: Sequelize.STRING,
        allowNull:false
      },
      oid: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      flag: {
        type: Sequelize.STRING,
        allowNull:false
      },
      distance_in_km:{
        allowNull:false,
        type:Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('routes');
  }
};
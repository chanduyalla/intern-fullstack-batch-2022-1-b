'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      oid:{
        type: Sequelize.INTEGER,
        allowNull:false
      },
      product_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      quantity: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      address_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      ordered_date: {
        allowNull:false,
        type: Sequelize.DATE
      },
      order_status: {
        allowNull:false,
        type: Sequelize.STRING
      },
      total_price: {
        allowNull:false,
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('orders');
  }
};
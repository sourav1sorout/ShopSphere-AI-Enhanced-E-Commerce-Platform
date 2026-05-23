const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const OrderItem = sequelize.define('OrderItem', {
  // OrderId and ProductId will be added via associations
  name: DataTypes.STRING,
  image: DataTypes.STRING,
  price: DataTypes.FLOAT,
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 }
  }
});

module.exports = OrderItem;

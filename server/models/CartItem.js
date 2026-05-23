const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CartItem = sequelize.define('CartItem', {
  // CartId and ProductId will be added via associations
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: { min: 1 }
  }
});

module.exports = CartItem;

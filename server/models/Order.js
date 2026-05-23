const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Order = sequelize.define('Order', {
  // Foreign key UserId will be added via associations
  shippingStreet: { type: DataTypes.STRING, allowNull: false },
  shippingCity: { type: DataTypes.STRING, allowNull: false },
  shippingState: { type: DataTypes.STRING, allowNull: false },
  shippingPincode: { type: DataTypes.STRING, allowNull: false },
  shippingCountry: { type: DataTypes.STRING, defaultValue: 'India' },
  
  paymentMethod: {
    type: DataTypes.STRING,
    defaultValue: 'Cash on Delivery'
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending' // Pending, Processing, Shipped, Delivered, Cancelled
  },
  deliveredAt: { type: DataTypes.DATE, allowNull: true },
  cancelledAt: { type: DataTypes.DATE, allowNull: true }
});

module.exports = Order;

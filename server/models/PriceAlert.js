const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PriceAlert = sequelize.define('PriceAlert', {
  // UserId and ProductId will be added via associations
  targetPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: { min: 0 }
  },
  currentPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  notified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['UserId', 'ProductId']
    }
  ]
});

module.exports = PriceAlert;

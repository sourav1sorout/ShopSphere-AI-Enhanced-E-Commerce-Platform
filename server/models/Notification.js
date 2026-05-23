const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Notification = sequelize.define('Notification', {
  // UserId will be added via associations
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'system' // price_alert, order_update, promotion, system
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  // Store as stringified JSON
  data: {
    type: DataTypes.TEXT,
    get() {
      const val = this.getDataValue('data');
      return val ? JSON.parse(val) : {};
    },
    set(val) {
      this.setDataValue('data', JSON.stringify(val));
    }
  }
});

module.exports = Notification;

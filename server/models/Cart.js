const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Cart = sequelize.define('Cart', {
  // UserId will be added via associations.
  // A Cart belongs to one User.
});

module.exports = Cart;

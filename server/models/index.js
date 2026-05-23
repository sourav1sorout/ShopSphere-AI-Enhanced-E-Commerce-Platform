const { sequelize } = require('../config/db');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Cart = require('./Cart');
const CartItem = require('./CartItem');
const PriceAlert = require('./PriceAlert');
const Notification = require('./Notification');

// --- Associations ---

// User <-> Order (1:M)
User.hasMany(Order, { foreignKey: 'UserId' });
Order.belongsTo(User, { foreignKey: 'UserId' });

// Order <-> OrderItem (1:M)
Order.hasMany(OrderItem, { foreignKey: 'OrderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'OrderId' });

// Product <-> OrderItem (1:M)
Product.hasMany(OrderItem, { foreignKey: 'ProductId' });
OrderItem.belongsTo(Product, { foreignKey: 'ProductId', as: 'product' });

// User <-> Cart (1:1)
User.hasOne(Cart, { foreignKey: 'UserId' });
Cart.belongsTo(User, { foreignKey: 'UserId' });

// Cart <-> CartItem (1:M)
Cart.hasMany(CartItem, { foreignKey: 'CartId', as: 'items' });
CartItem.belongsTo(Cart, { foreignKey: 'CartId' });

// Product <-> CartItem (1:M)
Product.hasMany(CartItem, { foreignKey: 'ProductId' });
CartItem.belongsTo(Product, { foreignKey: 'ProductId', as: 'product' });

// User <-> PriceAlert (1:M)
User.hasMany(PriceAlert, { foreignKey: 'UserId' });
PriceAlert.belongsTo(User, { foreignKey: 'UserId' });

// Product <-> PriceAlert (1:M)
Product.hasMany(PriceAlert, { foreignKey: 'ProductId' });
PriceAlert.belongsTo(Product, { foreignKey: 'ProductId', as: 'product' });

// User <-> Notification (1:M)
User.hasMany(Notification, { foreignKey: 'UserId' });
Notification.belongsTo(User, { foreignKey: 'UserId' });

module.exports = {
  sequelize,
  User,
  Product,
  Order,
  OrderItem,
  Cart,
  CartItem,
  PriceAlert,
  Notification
};

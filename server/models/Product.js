const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: { min: 0 }
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  brand: {
    type: DataTypes.STRING,
    defaultValue: 'Unbranded'
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: 'https://via.placeholder.com/300x300?text=No+Image'
  },
  // Store as stringified JSON
  images: {
    type: DataTypes.TEXT,
    get() {
      const val = this.getDataValue('images');
      return val ? JSON.parse(val) : [];
    },
    set(val) {
      this.setDataValue('images', JSON.stringify(val));
    }
  },
  color: { type: DataTypes.STRING, defaultValue: '' },
  size: { type: DataTypes.STRING, defaultValue: '' },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0 }
  },
  ratings: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: { min: 0, max: 5 }
  },
  numReviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isTrending: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isBestSeller: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isNewArrival: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  sold: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  discountPercentage: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: { min: 0, max: 100 }
  },
  // Store as stringified JSON
  specifications: {
    type: DataTypes.TEXT,
    get() {
      const val = this.getDataValue('specifications');
      return val ? JSON.parse(val) : {};
    },
    set(val) {
      this.setDataValue('specifications', JSON.stringify(val));
    }
  },
  // Store as stringified JSON
  tags: {
    type: DataTypes.TEXT,
    get() {
      const val = this.getDataValue('tags');
      return val ? JSON.parse(val) : [];
    },
    set(val) {
      this.setDataValue('tags', JSON.stringify(val));
    }
  }
});

module.exports = Product;

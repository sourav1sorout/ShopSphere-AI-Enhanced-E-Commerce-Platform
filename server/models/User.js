const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 255]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 255]
    }
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user' // 'user' or 'admin'
  },
  phone: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  addressStreet: { type: DataTypes.STRING, defaultValue: '' },
  addressCity: { type: DataTypes.STRING, defaultValue: '' },
  addressState: { type: DataTypes.STRING, defaultValue: '' },
  addressPincode: { type: DataTypes.STRING, defaultValue: '' },
  addressCountry: { type: DataTypes.STRING, defaultValue: 'India' },
  avatar: { type: DataTypes.STRING, defaultValue: '' },
  resetPasswordToken: { type: DataTypes.STRING, allowNull: true },
  resetPasswordExpire: { type: DataTypes.DATE, allowNull: true }
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// Compare password method
User.prototype.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = User;

const { Sequelize } = require('sequelize');
const path = require('path');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false, // Set to console.log to see SQL queries
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ SQLite Database Connected');
    
    // Sync models (in production, use migrations instead of sync)
    // Need to require models before sync so Sequelize knows about them
    require('../models');
    await sequelize.sync({ alter: true });
    console.log('✅ SQLite Database Synced');
  } catch (error) {
  console.error('❌ SQLite Connection Error');
  console.error(error);

  if (error.errors) {
    error.errors.forEach((err) => {
      console.error('Field:', err.path);
      console.error('Message:', err.message);
      console.error('Value:', err.value);
    });
  }

  console.error(error.stack);
  process.exit(1);
}
};

module.exports = { sequelize, connectDB };

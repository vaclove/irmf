
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Guest = sequelize.define('Guest', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Guest;

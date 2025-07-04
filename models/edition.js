
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Edition = sequelize.define('Edition', {
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  }
});

module.exports = Edition;

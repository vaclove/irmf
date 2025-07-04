
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Guest = require('./guest');
const Edition = require('./edition');

const Invitation = sequelize.define('Invitation', {
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending' // pending, confirmed, declined
  }
});

Guest.belongsToMany(Edition, { through: Invitation });
Edition.belongsToMany(Guest, { through: Invitation });

module.exports = Invitation;

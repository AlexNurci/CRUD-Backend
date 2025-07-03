const { DataTypes } = require('sequelize');
const db = require('./db');

const Campus = db.define('Campus', {
  campusName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: 'https://via.placeholder.com/150',
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  students: {
    type: DataTypes.STRING,
  }
});

module.exports = Campus;
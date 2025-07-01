const { DataTypes } = require('sequelize');
const db = require('./db');

const Student = db.define('Student', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: 'https://via.placeholder.com/150',
  },
  gpa: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0.0,
      max: 4.0,
    },
  },
});

module.exports = Student;

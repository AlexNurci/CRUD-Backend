const db = require('./db');
const Campus = require('./campus');
const Student = require('./student');

Student.belongsTo(Campus, { foreignKey: 'CampusId' }); // not sure if needed
Campus.hasMany(Student, { foreignKey: 'CampusId' });

module.exports = {
  db,
  Campus,
  Student,
};

const StudentFactory = require('./factories/StudentFactory');
const AttendanceFactory = require('./factories/AttendanceFactory');

module.exports = seed = async (DB) => {
  await DB.sequelize.models.Student.bulkCreate(await StudentFactory(200, DB));
  await DB.sequelize.models.Attendance.bulkCreate(
    await AttendanceFactory(50000, new Date(), DB),
  );
};

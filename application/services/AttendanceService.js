const DB = require('../models');
const { QueryTypes, Op } = require('sequelize');

module.exports = {
  getOne: async (AttendanceId) => {},

  getManyForAcademy: async (AcademyId, Limit, Offset) => {},

  createOneForAcademy: async (
    AcademyId,
    StudentId,
    SubjectId,
    From,
    Until,
  ) => {},

  updateOne: async (
    AttendanceId,
    AcademyId,
    StudentId,
    SubjectId,
    From,
    Until,
  ) => {},

  deleteOne: async (AttendanceId) => {},

  getMonthSummaryForAcademy: async (AcademyId, Date) => {},
};

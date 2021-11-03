const { DatabaseError } = require('sequelize');
const AttendanceService = require('../services/AttendanceService');
const createError = require('http-errors');

module.exports = {
  getOne: async (req, res, next) => {
		try {
			
			const { AttendanceId } = req.params;

			const Attendance = await AttendanceService.getOne(AttendanceId);

			return res.json(Attendance);

		} catch (error) {
			next(createError(error));
		}
	},

  getManyForAcademy: async (req, res, next) => {
		try {
			const { AcademyId, Limit, Offset } = req.query;

			const Attendances = await AttendanceService.getManyForAcademy(AcademyId, Limit, Offset);

			return res.json([ ...Attendances ]);
		} catch (error) {
			next(createError(error));
		}
	},

  createOneForAcademy: async (req, res, next) => {
		try {
			const { AcademyId, StudentId, SubjectId, From, Until } = req.body;

			const Attendance = await AttendanceService.createOneForAcademy(AcademyId, StudentId, SubjectId, From, Until);
			
			return res.json(Attendance);
		} catch (error) {
			next(createError(error));
		}
	},

  updateOne: async (req, res, next) => {
		try {
			const { AttendanceId } = req.params;
			const { AcademyId, StudentId, SubjectId, From, Until } = req.body;

			const UpdatedAttendanceCount = await AttendanceService.updateOne(AttendanceId, AcademyId, StudentId, SubjectId, From, Until);

			if(UpdatedAttendanceCount > 0){
				return res.status(204).send();
			} else throw createError(404, 'Attendance not found');

		} catch (error) {
			next(createError(error));
		}
	},

  deleteOne: async (req, res, next) => {
		try {
			const { AttendanceId } = req.params;

			const result = await AttendanceService.deleteOne(AttendanceId);

			if(result > 0){
				return res.status(204).send();
			} else throw createError(404, 'Attendance not found');

		} catch (error) {
			next(createError(error));
		}
	},

  getMonthSummaryForAcademy: async (req, res, next) => {

		const { AcademyId, Date } = req.query;

		const MonthSummary = await AttendanceService.getMonthSummaryForAcademy(AcademyId, Date);
		
		return res.json(MonthSummary);
	},
};

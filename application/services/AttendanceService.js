const { sequelize, Attendance, Subject, Student } = require('../models');
const {Sequelize, QueryTypes, Op } = require('sequelize');
const createError = require('http-errors');

module.exports = {
  getOne: async (AttendanceId) => {
		const result = await Attendance.findOne({
			attributes: ['id', 'From', 'Until', 'StudentId', 'SubjectId'],
			where: { id: AttendanceId }, 
		});

		return result
	},

  getManyForAcademy: async (AcademyId, Limit, Offset) => {
		const Attendances = await Attendance.findAll({
			attributes: ['id', 'From', 'Until', 'StudentId'],
			includes: [{
				model: Student,
				attributes: [],
				where: { AcademyId }
			}],
			limit: Limit ? Limit : 100,
			offset: Offset ? Offset : 0
		});

		return Attendances
	},

  createOneForAcademy: async (
    AcademyId,
    StudentId,
    SubjectId,
    From,
    Until,
  ) => {
		
		const StudentFromAcademy = await Student.findOne({ attributes: ['id'], where: { id: StudentId, AcademyId: AcademyId } });

		if(!StudentFromAcademy)
			throw createError(404, 'Student not found for given academy');

		const CreatedAttendance = await Attendance.create({
			SubjectId,
			Date: new Date(From).toISOString(),
			From,
			Until,
			StudentId: StudentFromAcademy.id 
		});

		return CreatedAttendance;
	},

  updateOne: async (
    AttendanceId,
    AcademyId,
    StudentId,
    SubjectId,
    From,
    Until,
  ) => {
		const StudentFromAcademy = await Student.findOne({ attributes: ['id'], where: { id: StudentId, AcademyId: AcademyId } });

		if(!StudentFromAcademy)
			throw createError(404, 'Student not found for given academy');
		
		// TODO: Если Date нужно обновлять в соответствии с From, то необходимо сделать проверку на существование From, формирование Date и обновление её в модели
		const UpdatedAttendanceCount = await Attendance.update({
				SubjectId, From, Until, StudentId: StudentFromAcademy.id,
			},
			{ where: { id: AttendanceId } }
		);

		return UpdatedAttendanceCount;
	},

  deleteOne: async (AttendanceId) => {
		const DeletedAttendance = await Attendance.destroy({ where: { id: AttendanceId } });

		return DeletedAttendance;
	},

  getMonthSummaryForAcademy: async (AcademyId, Date) => {
		const Summary = await Student.findAll({
			where: { AcademyId },
			attributes: [
				'id', 
				[Sequelize.fn('concat', Sequelize.col('Lastname'), ' ', Sequelize.col('Firstname')), 'Fullname'],
				[sequelize.literal(`(
					select 
							sum(round(cast(extract (EPOCH FROM ("Attendances"."Until" - "Attendances"."From"))/60/60 as numeric),2))
						from "Attendances"
							inner join "Students" on "Students"."id" = "Attendances"."StudentId"
					where "Students"."AcademyId" = ${AcademyId} 
						and "Attendances"."StudentId" = "Student"."id" 
						and substring(cast("Attendances"."Date" as varchar),1,7) = substring(cast("Days"."Date" as varchar),1,7)
					group by "Attendances"."StudentId", substring(cast("Attendances"."Date" as varchar),1,7)
					)`
					), 'MonthTotal']
			],
			include: [
				{
					where: { Date },
					model: Attendance,
					as: 'Days',
					required: true,
					attributes: ['id', 
						[Sequelize.literal(`case when "Until" is null then 'true' else 'false' end`), 'UnfinishedAttendance'],
						[Sequelize.literal(
							`(select 
								SUM(ROUND(CAST(EXTRACT (EPOCH FROM ("Until" - "From"))/60/60 as numeric),2))
							from "Attendances"
								inner join "Students" on "Students"."id" = "Attendances"."StudentId"
							where "Students"."AcademyId" = ${AcademyId} 
								and "Attendances"."StudentId" = "Student"."id"
								and "Attendances"."Date" = "Days"."Date"
							group by "Attendances"."Date"
							)` 
							), 'DayTotal'	]
					],
					include: [{
						model: Subject,
						required: true,
						attributes: ['id', 'Name',
							[Sequelize.literal(
								`(select 
										SUM(ROUND(CAST(EXTRACT (EPOCH FROM ("Until" - "From"))/60/60 as numeric),2))
									from "Attendances"
										inner join "Students" on "Students"."id" = "Attendances"."StudentId"
									where "Students"."AcademyId" = ${AcademyId} 
										and "Attendances"."StudentId" = "Student"."id"
										and "Attendances"."Date" = "Days"."Date"
										and "Attendances"."SubjectId" = "Days"."SubjectId" 
									group by "Attendances"."SubjectId")` 
								), 'SubjectTotal'
							]
						]
					}]
				}
			],
		});

		return Summary;
	},
};

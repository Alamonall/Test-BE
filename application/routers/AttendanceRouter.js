const Express = require('express');
const Router = Express.Router();
const AttendanceController = require('../../application/controllers/AttendanceController');

Router.get('/:AttendanceId(\\d+)', AttendanceController.getOne);
Router.get('/', AttendanceController.getManyForAcademy);
Router.post('/', AttendanceController.createOneForAcademy);
Router.patch('/:AttendanceId(\\d+)', AttendanceController.updateOne);
Router.delete('/:AttendanceId(\\d+)', AttendanceController.deleteOne);
Router.get('/monthsummary', AttendanceController.getMonthSummaryForAcademy);

module.exports = Router;

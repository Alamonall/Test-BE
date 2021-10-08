const Express = require('express');
const Router = Express.Router();
const AttendanceRouter = require('./AttendanceRouter');

Router.use('/attendance', AttendanceRouter);

module.exports = Router;

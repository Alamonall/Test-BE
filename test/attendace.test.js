
const { expect } = require('chai')
const chai = require('chai'),
	chaiHttp = require('chai-http');

const base_url =  process.env.APPLICATION_PROTOCOL + process.env.APPLICATION_PROTOCOL + process.env.APPLICATION_PROTOCOL + process.env.API || 'http://localhost:3000/api/v1'

chai.use(chaiHttp)

describe('Тестируем Attendance', () => {
	// Получить реальные данные с бд и сравнить с результатом запроса
	[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4}].forEach( ( attendance ) => {
		it('GET One For Academy with attendance id = ' + attendance.id, done => {
			chai.request(base_url)
				.get('/attendance/' + attendance.id)
				.query({
					"AcademyId": 1,
					"Limit": 100,
					"Offset": 0
				}) 
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.body.id).to.be.an('number');
					expect(res.body.id).to.equal(attendance.id);
					done();
				});
		});
	});

	it('GET Many For Academy', done => {
		chai.request(base_url)
			.get('/attendance/')
			.query({
				"AcademyId": 1,
				"Limit": 100,
				"Offset": 0
			}) 
			.end((err, res) => {
				console.log(res.body)
				expect(res).to.have.status(200);
				expect(res.body).to.be.an('array');
				done();
			});
	});

	it.skip('GET Month Summary For Academy', done => {
		chai.request(base_url)
			.get('/attendance/monthsummary')
			.query({
				"AcademyId": 1,
				"Date": '2021-09-07T00:01:00.000Z'
			}) 
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.be.an('array');
				done();
			});
	});

	it('CREATE One For Academy', done => {
		const attendance = {
			"AcademyId": 1,
			"StudentId": 1,
			"SubjectId": 1,
			"From": "2021-10-07T10:00:00.000Z",
			"Until": "2021-10-07T18:00:00.000Z"
		}
		chai.request(base_url)
			.post('/attendance')
			.send(attendance) 
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.id).to.be.an('number');
				expect(res.body.AcademyId).to.be.an('number');
				expect(res.body.AcademyId).to.equal(AcademyId);
				expect(res.body.StudentId).to.be.an(attendance.id);
				expect(res.body.StudentId).to.equal(attendance.StudentId);
				expect(res.body.SubjectId).to.be.an('number');
				expect(res.body.SubjectId).to.equal(attendance.SubjectId);
				expect(res.body.From).to.equal('string');
				expect(res.body.From).to.be.an(attendance.From);
				expect(res.body.Until).to.equal('string');
				expect(res.body.Until).to.be.an(attendance.Until);
				done();
			});
	});

	it('UPDATE One', done => {
		chai.request(base_url)
			.patch('/attendance/1')
			.query({
				"AcademyId": 1,
				"StudentId": 1,
				"SubjectId": 1,
				"From": "2021-10-07T10:00:00.000Z",
				"Until": "2021-10-07T18:00:00.000Z"
			}) 
			.end((err, res) => {

				done();
			});
	});

	it('DELETE One', done => {
		chai.request(base_url)
			.delete('/attendance/1')
			.query({
				"TenantId": 1,
				"UserId": 1,
				"BuildingId": 1,
				"From": "2021-10-07T10:00:00.000Z",
				"Until": "2021-10-07T18:00:00.000Z"
			}) 
			.end((err, res) => {

				done();
			});
	});
	
});
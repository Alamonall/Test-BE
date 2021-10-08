# Dok95

dok95 interview test repository

## Back end developer coding assessment

## Coding assessment description

You've received a request to implement service with REST API
to get students attendance information. Postman collection given.

## You are asked to

1. Implement given attendance service and controller

### What we expect from you

1. Do your best writing clean & maintainable code
2. Demonstrate your software designs skills (SOLID, KISS, DRY, etc)
3. Show your raw sql query writing, js sequelize and database optimization skills

### Technologies you have to use

1. JS as a back end language
2. Postgresql as a database engine

### To start

1. Fill in .env like .env.example
2. Install all dependencies with npm i
3. Fill database with test entities with npm run db-seed
4. Start server with npm run dev

### Data model and logic

Here is a brief data model you've received.

Implement GET One from request with attendance id with response

```
{
	"id": 1,
	"From": "2021-10-06T15:40:39.362Z",
	"Until": "2021-10-06T16:21:39.362Z",
	"SubjectId": 5,
	"StudentId": 2
},
```

Implement GET For Academy from request with academy id, limit and offset in query with response

```
[
	{
		"id": 1,
		"From": "2021-10-06T15:40:39.362Z",
		"Until": "2021-10-06T16:21:39.362Z",
		"SubjectId": 5,
		"StudentId": 2
	},
	{
		"id": 2,
		"From": "2021-10-06T11:50:39.362Z",
		"Until": null,
		"SubjectId": 6,
		"StudentId": 4
	},
	{
		"id": 3,
		"From": "2021-10-06T16:24:39.362Z",
		"Until": "2021-10-06T17:36:39.362Z",
		"SubjectId": 7,
		"StudentId": 4
	},
    ...
[
```

Implement CREATE One For Academy with 204 or 200 status response

Implement UPDATE One with body
```
{
    "AcademyId": 1,
    "StudentId": 1,
    "SubjectId": 1,
    "From": "2021-10-07T10:00:00.000Z",
    "Until": "2021-10-07T18:00:00.000Z"
}
```
from request with attendance id in params

Implement DELETE One with 204 status response on delete and 404 on not found

and

Implement GET Month Summary For Academy for all students and days in month with response
```
[
	{
		"id": 68,
		"Fullname": "Aglae Donnelly",
		"MonthTotal": 37.41,
		"Days": [
			{
				"Date": "2021-09-01",
				"DayTotal": 0.72,
				"UnfinishedAttendance": false
				"Subject": [
					"Computer communications": 0.36,
					"Theory of computation": 0.36
				]
			},
			{
				"Date": "2021-09-02",
				"DayTotal": 0.28,
				"UnfinishedAttendance": false
				"Subject": [
					"Algorithms": 0.18,
					"Computer communications": 0.10
				]
			},
			{
				"Date": "2021-09-06",
				"DayTotal": null,
				"UnfinishedAttendance": true
				"Subject": [
					"Algorithms": null,
				]
			}
            ...
		]
	},
    {
		"id": 26,
		"Fullname": "Alexandre Fisher"
		"MonthTotal": 40.85,
		"Days": [
			{
				"Date": "2021-09-09",
				"DayTotal": 5.58,
				"UnfinishedAttendance": false
				"Subject": [
					"Algorithms": 2.18,
					"Computer communications": 3.40
				]
			},
			{
				"Date": "2021-09-12",
				"DayTotal": 1.3,
				"UnfinishedAttendance": true
				"Subject": [
					"Algorithms": 1.3,
					"Theory of computation": null
				]
			}
            ...
		]
	}
    ...
[
```
from request with AcademyId in query, Date as timestamp iso string of any day in requested month

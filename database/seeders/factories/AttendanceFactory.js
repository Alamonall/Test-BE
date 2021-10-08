const faker = require('faker');

module.exports = make = async (count, startDate, DB) => {
  const Students = await DB.sequelize.models.Student.findAll();
  const Subjects = await DB.sequelize.models.Subject.findAll();

  const subjects = {};
  for (let i = 0; i < Subjects.length; i++) {
    if (!subjects[Subjects[i].AcademyId]) subjects[Subjects[i].AcademyId] = [];
    subjects[Subjects[i].AcademyId].push(Subjects[i].id);
  }

  const limit = 23;
  const Attendances = [];
  let from = startDate;
  let j, min, max, From, Until;
  for (let i = 0; i < count; ) {
    from.setDate(from.getDate() - 1);
    for (j = 0; j < Students.length; j++) {
      for (min = from.getHours(); min < limit; ) {
        min = randomNumber(min, limit);
        max = randomNumber(min, limit);
        if (max === min) {
          continue;
        }

        From = new Date(from).setHours(min, Math.floor(Math.random() * 60));
        Until = getRandomBool()
          ? null
          : new Date(from).setHours(max, Math.floor(Math.random() * 60));

        Attendances.push({
          Date: From,
          From,
          Until,
          StudentId: Students[j].id,
          SubjectId:
            subjects[Students[j].AcademyId][
              Math.floor(Math.random() * subjects[Students[j].AcademyId].length)
            ],
        });
        min = max + 1;
        i++;
      }
    }
  }
  return Attendances;
};

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomBool() {
  return faker.datatype.boolean() && faker.datatype.boolean();
}

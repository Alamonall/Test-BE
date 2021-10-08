const faker = require('faker');

module.exports = make = async (count, DB) => {
  const Academies = await DB.sequelize.models.Academy.findAll({
    attributes: ['id'],
  });

  let academyId;
  let Student = [];
  for (let i = 0; i < count; i++) {
    academyId = Academies[Math.floor(Math.random() * Academies.length)].id;

    Student.push({
      Firstname: faker.name.firstName(),
      Lastname: faker.name.lastName(),
      Email: faker.unique(faker.internet.email),
      Password: 'password',
      AcademyId: academyId,
    });
  }
  return Student;
};

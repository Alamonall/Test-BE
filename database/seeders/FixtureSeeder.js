const AcademyFixture = require('./fixtures/AcademyFixture.json');
const SubjectFixture = require('./fixtures/SubjectFixture.json');

module.exports = seed = async (DB) => {
  await DB.sequelize.models.Academy.bulkCreate(AcademyFixture);
  await DB.sequelize.models.Subject.bulkCreate(SubjectFixture);
};

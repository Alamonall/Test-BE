const DB = require('../application/models');
const FixtureSeeder = require('../database/seeders/FixtureSeeder');
const FactorySeeder = require('../database/seeders/FactorySeeder');

DB.sequelize
  .authenticate()
  .then(async () => {
    await DB.sequelize.sync({ force: true });
    await FixtureSeeder(DB);
    await FactorySeeder(DB);
  })
  .then(() => {
    console.log('--- SUCCESS');
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  })
  .finally(() => process.exit());

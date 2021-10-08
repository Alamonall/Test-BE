const CORS = require('cors');
const BodyParser = require('body-parser');
const DB = require('./application/models');
const AppRouter = require('./application/routers/AppRouter');

DB.sequelize
  .authenticate()
  .then(() => {
    const App = require('express')();

    //Accept self-signed certificates in DEV environment
    if (process.env.NODE_ENV === 'development')
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    //Allows CORS
    App.use(CORS());

    //Express dependencies
    App.use(BodyParser.json({ limit: '15mb' }));

    App.use('/api/v1', AppRouter);

    //Start server
    App.listen(process.env.APPLICATION_PORT, () => {
      console.log('Server has started!');
    });
  })
  .catch((e) => {
    console.log(e);
    process.exit();
  });

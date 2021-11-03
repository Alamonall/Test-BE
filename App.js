const CORS = require('cors');
const BodyParser = require('body-parser');
const DB = require('./application/models');
const AppRouter = require('./application/routers/AppRouter');
const logger = require('morgan');

DB.sequelize
	.sync({ force: false })
  .then(() => {
    const App = require('express')();

    //Accept self-signed certificates in DEV environment
    if (process.env.NODE_ENV === 'development')
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    //Allows CORS
    App.use(CORS());

		//logger
		App.use(logger('dev'));

    //Express dependencies
    App.use(BodyParser.json({ limit: '15mb' }));

    App.use('/api/v1', AppRouter);

    //Start server
    App.listen(process.env.APPLICATION_PORT, () => {
      console.log('Server has started with port: ', process.env.APPLICATION_PORT);
    });

		App.use((error, req, res, next) => {
			const PreparedMessage = { status: error.status, message: error.message }
		
			res.status(error.status || 500)
		
			if (process.env.NODE_ENV !== 'production') {
				PreparedMessage.stack = error.stack
			}
		
			if (error.status === 500 && process.env.NODE_ENV !== 'development') {
				PreparedMessage.message = 'При выполнении операции на сервере произошла ошибка.'
			}
		
			return res.json(PreparedMessage)
		})
  })
  .catch((e) => {
    console.log(e);
    process.exit();
  });

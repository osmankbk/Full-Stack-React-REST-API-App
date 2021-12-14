

// 'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
//Heroku added
const path = require('path');
const { sequelize } = require('./models');
const routes = require('./routes/users.js');
const routess = require('./routes/courses.js');


// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();
// setup morgan which gives us http request logging
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// TODO setup your api routes here
app.use('/api', routes);
app.use('/api', routess);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

//Heroku added
app.use(express.static(path.join(__dirname, 'client/build')));

//Heroku added
// if(process.env.NODE_ENV === 'production') {  
//   app.use(express.static(path.join(__dirname, 'client/build')));  

//   app.get('*', (req, res) => {    
//     res.sendfile(path.join(__dirname = 'client/build/index.html'));  
//     })
//   }
if(process.env.NODE_ENV === 'production') {  
  app.use(express.static(path.join(__dirname, 'client/build'))); 

  app.get('*', (req, res) => {    res.sendfile(path.join(__dirname = 'client/build/index.html'));  
  });
}


  //Heroku added
  app.get('*', (req, res) => {  
    res.sendFile(path.join(__dirname+'/client/public/index.html'));
  });

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

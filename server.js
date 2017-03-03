// require our packages
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const mongoose = require('mongoose');
// use bluebird to be the promise library for mongoose
mongoose.Promise = require('bluebird');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const { port, env, dbURI, sessionSecret } = require('./config/environment');
const errorHandler = require('./lib/errorHandler');
const routes = require('./config/routes');
const customResponses = require('./lib/customResponses');
const authentication = require('./lib/authentication');

//create an expres app
const app = express();


// set up our templates engine (views)
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

//set up out static files folder
// first look in public folder for target, then look at routes
app.use(express.static(`${__dirname}/public`));

// create a database connection with mongoose
mongoose.connect(dbURI);

//set up the middleware
// body parser
if(env !== 'test') app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride((req) => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method; // so it doesn't get passed to the controllers

    return method;
  }
}));

// set up our sesstions
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));

// set up flash messages AFTER sessions so it can reference the session
app.use(flash());

// use customResponses for handling error pages.
app.use(customResponses);
app.use(authentication);

// routes, just before the error handler
app.use(routes);

// set up the error handler - the LAST piece of middle ware.
app.use(errorHandler);

//test
app.listen(port, () => console.log(`express is listening to port ${port}`));

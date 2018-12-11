// Load node.js modules
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const routes = require('./routes/index');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');
const https = require('https');

// Create an express app
const app = express();

// Setup views engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve up static files from the public folder.
app.use(express.static(path.join(__dirname, 'public')));

// Take raw requests and turn them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allows us to pass data between pages in user requests to flash messages.
app.use(flash());

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// Handle routes
app.use('/', routes);

// If the routes don't work, we hand it off to error-reporting middleware
app.use(errorHandlers.notFound);
app.use(errorHandlers.flashValidationErrors);
// Will print a stack trace while in development
if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

// Export the app so we can call it in start.js
module.exports = app;

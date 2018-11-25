const mongoose = require('mongoose');

// Import ENV variables
require('dotenv').config({ path: 'variables.env' });

// Connect to mongodb database
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`Mongoose did a bad: ${err.message}`);
})

// Import all models here
require('./models/data_location');

// Start the app
const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running -> PORT ${server.address().port}`);
});

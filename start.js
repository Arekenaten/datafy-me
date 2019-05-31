const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');

// Import ENV variables
require('dotenv').config({ path: 'variables.env' });

// Connect to mongodb database
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`Mongoose did a bad: ${err.message}`);
});

// Import all models here
require('./models/data_location');
require('./models/fitbit_key');
require('./models/key');

// Start the app
const app = require('./app');
app.set('port', process.env.PORT || 7777);

const options = {
  cert: fs.readFileSync('./sslcert/fullchain.pem'),
  key: fs.readFileSync('./sslcert/privkey.pem')
};

https.createServer(options, app)
.listen(app.get('port'), () => {
  console.log(`Express running -> PORT ${app.get('port')}`)
})

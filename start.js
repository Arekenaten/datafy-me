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
require('./models/key');

// Start the app
const app = require('./app');
app.set('port', process.env.PORT || 7777);
// const server = app.listen(app.get('port'), () => {
//   console.log(`Express running -> PORT ${server.address().port}`);
// });

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(app.get('port'), () => {
  console.log(`Express running -> PORT ${app.get('port')}`)
})

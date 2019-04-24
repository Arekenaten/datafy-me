// Controller for API authentication, validation, and sanitization of input data
const mongoose = require('mongoose');
const Key = mongoose.model('key');
const md5 = require('md5');
const FitbitApiClient = require("fitbit-node");
const Fitbit_key = mongoose.model('fitbit_key');


// Connect to fitbit api
const client = new FitbitApiClient({
  clientId: process.env.FITBIT_CLIENT_ID,
  clientSecret: process.env.FITBIT_CLIENT_SECRET,
  apiVersion: '1.2' // 1.2 is the default
});

// Method for authenticating API keys passed in the message body
exports.authenticateKey = async (req, res, next) => {
  const hashed = md5(req.body.key);
  const success = await Key.findOne({ key: hashed });
  if (!success) {
    res.send(`Your API key wasn't found. Please try again.`);
  } else {
    next();
  }
};

// Method for processing location data input
exports.processLocationData = async (req, res, next) => {
  var errors = ['Errors: <br>'];

  // Timestamp has a default value and can be empty
  if (!(req.body.timestamp == undefined)) {
    req.body.timestamp = req.body.timestamp.trim().escape();
  }

  // Lat + long values cannot be empty and must be a numer
  if (!(req.body.lat == undefined)) {
    if (!(parseFloat(req.body.lat))) {
      errors.push('Latitude value is not a number');
    }
  } else {
    errors.push('Latitude value is empty');
  }
  // Long
  if (!(req.body.long == undefined)) {
    if (!(parseFloat(req.body.long))) {
      errors.push('Longitude value is not a number');
    }
  } else {
    errors.push('Longitude value is empty');
  }

  // Numvisits can be empty but must be a number when provided.
  if (!(req.body.numVisits == undefined)) {
    if (!(parseFloat(req.body.numVisits))) {
      errors.push('NumVisits value is not a number');
    }
  }

  // Error output
  if (errors.length > 1) {
    var output = errors[0];
    for (var i = 1; i <= errors.length - 1; i++) {
      output += errors[i] + '<br>';
    }
    res.send(output);
    return;
  } else {
    next();
  }
}

// Fitbit authenticate
exports.authenticateFitbit = async (req, res) => {
  // request access to the user's activity, heartrate, location, nutrion, profile, settings, sleep, social, and weight scopes
  res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', `https://${process.env.SITE_DOMAIN}/api/fitbit/callback`));
}
// Authenticate callback function to get access token
exports.storeFitbitKey = async (req, res) => {
  // Call fitbit api using code from callback to get access token
  client.getAccessToken(req.query.code, `https://${process.env.SITE_DOMAIN}/api/fitbit/callback`).then(async results => {
    // Clear any keys that exist in the database
    await Fitbit_key.deleteMany({});
    // Store new key in database
    const fitbit_key = await (new Fitbit_key(
      {
        authKey: results.access_token,
        refreshKey: results.refresh_token
      }
    )).save();
    // Placehold results
    res.send(fitbit_key);
  })
}
exports.refreshFitbitKey = async (req, res, next) => {
  // Get the fitbit key from database
  const fitbit_key = await (Fitbit_key.findOne({}));
  // Call fitbit api to get updated authKey if needed
  await client.refreshAccessToken(fitbit_key.authKey, fitbit_key.refreshKey).then(async results => {
    // Refresh keys on fitbit_key with results
    fitbit_key.authkey = results.access_token;
    fitbit_key.refreshKey = results.refresh_token;
  });
  // Call save to update database
  fitbit_key.save();
  next();
}
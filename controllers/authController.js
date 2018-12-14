// Controller for API authentication, validation, and sanitization of input data
const mongoose = require('mongoose');
const Key = mongoose.model('key');
const md5 = require('md5');

// Method for authenticating API keys passed in the message body
exports.authenticateKey = async (req, res, next) => {
  const hashed = md5(req.body.key);
  const success = await Key.findOne({key: hashed});
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

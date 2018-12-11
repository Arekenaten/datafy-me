// Controller for data handling and navigation
const mongoose = require('mongoose');
const Location = mongoose.model('data_location');

// ----------------------------- Navigation ------------------------------------
exports.homePage = async (req, res) => {
  res.render('index');
};


// ---------------------------- Location Data ----------------------------------
// Add location data
exports.addLocationData = async (req, res) => {
  const coordinates = [req.body.lat, req.body.long];
  const location = await (new Location(
    {
      location: {coordinates: coordinates},
      numVisits: req.body.numVisits
    }
  )).save();
  // Redirect to location data page
  res.redirect('/api/location');
};

exports.viewLocationData = async (req, res) => {
  res.render('location');
};

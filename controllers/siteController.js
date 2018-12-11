const mongoose = require('mongoose');
const Location = mongoose.model('data_location');

exports.homePage = async (req, res) => {
  res.render('index');
};

exports.addLocationData = async (req, res) => {
  const coordinates = [req.body.lat, req.body.long];
  const location = await (new Location(
    {
      location: {coordinates: coordinates, address: req.body.address || 'Not given'},
      numVisits: req.body.numVisits
    }
  )).save();
  res.redirect('/api/location');
};

exports.viewLocationData = async (req, res) => {
  res.render('location');
};

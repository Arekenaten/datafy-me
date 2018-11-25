const mongoose = require('mongoose');
const Location = mongoose.model('data_location');

exports.homePage = async (req, res) => {
  res.render('index');
};

exports.addLocationData = async (req, res) => {
  const location = await (new Location(
    {
      location: {coordinates: [1,1], address: 'An address'},
      numVisits: 1
    }
  )).save();
  res.redirect('/api/location');
};

exports.viewLocationData = async (req, res) => {
  res.render('location');
};

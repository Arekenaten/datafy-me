// Controller for data handling and navigation
const mongoose = require('mongoose');
const Location = mongoose.model('data_location');

// ----------------------------- Navigation ------------------------------------
exports.homePage = async (req, res) => {
  res.render('index', { title: "Home" });
};
exports.aboutPage = async (req, res) => {
  res.render('about', { title: "About" });
};
exports.worksPage = async (req, res) => {
  res.render('my_work', { title: "Works" });
};
exports.resumePage = async (req, res) => {
  res.render('resume', { title: "Resume" });
};
exports.contactPage = async (req, res) => {
  res.render('contact', { title: "Contact" });
};


// ---------------------------- Location Data ----------------------------------
// Add location data
exports.addLocationData = async (req, res) => {
  const coordinates = [req.body.lat, req.body.long];
  const location = await (new Location(
    {
      location: {coordinates: coordinates}
    }
  )).save();

  // Redirect to location data page
  res.redirect('/api/location');
};

exports.viewLocationData = async (req, res) => {
  res.render('location', { title: "Location Data" });
};

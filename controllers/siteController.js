// Controller for data handling and navigation
const mongoose = require('mongoose');
const Location = mongoose.model('data_location');
const FitbitApiClient = require("fitbit-node");
const Fitbit_key = mongoose.model('fitbit_key');

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
exports.myLifeInDataPage = async (req, res) => {
  res.render('my_life_in_data', { title: "My Life in Data" });
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


// ---------------------------- Fitbit Data -------------------------------------
// Connect to fitbit api
const client = new FitbitApiClient({
  clientId: process.env.FITBIT_CLIENT_ID,
  clientSecret: process.env.FITBIT_CLIENT_SECRET,
  apiVersion: '1.2' // 1.2 is the default
});

exports.getSleepData = async (req, res) => {
  // Get the fitbit key from database
  const fitbit_key = await Fitbit_key.findOne({});
  // Call fitbit api using authKey (sample date)
  client.get(`/sleep/date/2019-04-19.json`, fitbit_key.authKey).then(results => {
    // Placehold results
    res.send(results);
  }).catch(err => {
    res.send(err);
  })
}
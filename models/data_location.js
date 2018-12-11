// Location data model
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const locationSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates!'
    }]
  }
});

module.exports = mongoose.model('data_location', locationSchema);

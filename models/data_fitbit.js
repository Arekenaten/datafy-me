const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const fitbitSchema = new mongoose.Schema({
  
});

module.exports = mongoose.model('data_fitbit', fitbitSchema);
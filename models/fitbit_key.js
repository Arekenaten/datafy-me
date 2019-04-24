// Location data model
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const fitbitKeySchema = new mongoose.Schema({
  authKey: {
    type: String,
    default: ''
  },
  refreshKey: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('fitbit_key', fitbitKeySchema);

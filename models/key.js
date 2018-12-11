const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const keySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('key', keySchema);

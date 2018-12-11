const mongoose = require('mongoose');
const Key = mongoose.model('key');
const md5 = require('md5');

exports.authenticateKey = async (req, res, next) => {
  const hashed = md5(req.body.key);
  const success = await Key.findOne({key: hashed});
  if (!success) {
    res.send(`Your API key wasn't found. Please try again.`);
  } else {
    next();
  }
};

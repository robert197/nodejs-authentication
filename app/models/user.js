var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
  name: String,
  birthday: Date
});

User.plugin(passportLocalMongoose,
{
  incorrectPasswordError: 'incorrectPasswordError',
  incorrectUsernameError: 'incorrectUsernameError'
});

module.exports = mongoose.model('User', User);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
  username: String,
  /*password: {type: String, required: true},*/
  name: String,
  age: Number,
  email: String,
  gender: String,
  biography: String,
  fbToken: {type: String, required: true},
  admin: Boolean,
  dates: Array
}));
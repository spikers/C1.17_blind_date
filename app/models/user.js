var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
  username: {type: String, required: true},
  //password: {type: String, required: true},
  name: String,
  age: Number,
  email: String,
  gender: String,
  biography: String,
  admin: Boolean
}));
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Mongoose automatically finds collection 'users'
module.exports = mongoose.model('user', new Schema({
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
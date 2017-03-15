var mongoose = require('mongoose');
var Schema = mongoose.Schema;

import { hangout } from './hangout.js';
let user = new Schema({
  username: String,
  /*password: {type: String, required: true},*/
  name: String,
  age: Number,
  email: String,
  gender: String,
  biography: String,
  fbToken: {
    type: String, 
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  hangouts: [hangout]
});

//Mongoose automatically finds collection 'users'
module.exports = mongoose.model('user', user);
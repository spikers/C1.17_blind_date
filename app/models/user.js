import mongoose from 'mongoose';
import { hangout } from './hangout';

let Schema = mongoose.Schema;

let user = new Schema({
  //This is basic user info from hangout.js
  username: String,
  given_name: String,
  gender: String,
  biography: String,
  age: Number,
  dietary_restrictions: {
    type: Array,
    default: ['none']
  }, //Vegan or not
  looking_for: {
    gender: String,
    pet: String
  }, //This is for matching you, cat dog fish bird
  interests: {
      pet: String
  }, //This is for yourself, cat dog fish bird
  profile_picture: String,


  family_name: String,
  email: String,
  status: { //active, inactive, disabled
    type: String,
    default: 'active'
  },
  fbToken: {
    type: String, 
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  hangouts: [ hangout ]
});

//Mongoose automatically finds collection 'users'
export default mongoose.model('user', user);
import mongoose from 'mongoose';
import {hangout} from './hangout';

let Schema = mongoose.Schema;

let user = new Schema({
  /*password: {type: String, required: true},*/

  //This is basic user info from hangout.js, I hate this solution
  username: String,
  given_name: String,
  gender: String,
  biography: String,
  age: Number,
  dietary_restrictions: {
    type: Array,
    default: ['none']
  }, //Vegan or not. Maybe beefless and porkless
  looking_for: [String], //This for for matching you, Cat dog fish bird
  interests: [String], //This is for yourself, cat dog fish birde


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
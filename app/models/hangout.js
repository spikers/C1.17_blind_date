import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let yelp = new Schema(
  {
    'id': String,
    'distance': Number,
    'phone': String,
    'rating': Number,
    'display_phone': String,
    'review_count': Number,
    'location': {
      'address3': String,
      'address2': String,
      'display_address': [String],
      'zip_code': String,
      'country': String,
      'address1': String,
      'state': String,
      'city': String
    },
    'is_closed': Boolean,
    'price': String,
    'name': String,
    'image_url': String,
    'coordinates': {
      'latitude': Number,
      'longitude': Number
    },
    'url': String,
    'transactions': [String],
    'categories': [
      {
        'title': String,
        'alias': String
      }
    ],
    //Active, inactive, or disabled
    'activity_status': {
      'type': String,
      'default': 'active'
    }
  }
);


let chat_message = new Schema({
  'fbToken': String,
  'given_name': String,
  'message': String,
  'timestamp': {
    'type': Date,
    'default': Date.now()
  }
})


let basic_user_information = new Schema({
  'username': String,
  'given_name': String,
  'gender': String,
  'biography': String,
  'age': Number,
  'dietary_restrictions': {
    'type': Array,
    'default': []
  }, //Vegan or not
  'looking_for': {
    //Other person
    'pet': String
  }, //This for for matching you, Cat dog fish bird
  'interests': {
    'pet': String
  } //This is for yourself, cat dog fish bird
})

let hangout = new Schema({
  'first_person': String,
  'second_person': String,
  'first_person_id': String,/*{
    ref: 'User',
    type: String
  },*/
  'second_person_id': String,/*{
    ref: 'User',
    type: String
  },*/
  'restaurant': yelp,
  'activity': yelp,
  'created': {
    type: Date,
    default: Date.now()
  },
  'chat': [chat_message]
});

export { hangout };
export default mongoose.model('hangout', hangout);
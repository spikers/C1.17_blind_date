var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.model('yelp', new Schema(
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
    ]
  }
));

module.exports = mongoose.model('hangout', new Schema({
  'first_person': String,
  'second_person': String,
  'restaurant': Schema.Types.Mixed,
  'activity': Schema.Types.Mixed
}));
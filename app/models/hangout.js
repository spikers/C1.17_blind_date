var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('hangout', new Schema({
  'first_person': String,
  'second_person': String,
  'restaurant': Schema.Types.Mixed,
  'activity': Schema.Types.Mixed
}));
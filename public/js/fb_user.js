var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({

    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

module.exports = mongoose.model('User', userSchema);


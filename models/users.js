//models/users.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    name: String,
    surname: String,
    birthdate: Date,
    image: String,
    creationDate: Date
});

module.exports = mongoose.model('User', UserSchema);
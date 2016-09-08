// models/bodyweight.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BodyweightSchema   = new Schema({
    exercise: String,
    weight: String,
    reps: String
});

module.exports = mongoose.model('Bodyweight', BodyweightSchema);
// models/bodyweight.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BodyweightSchema   = new Schema({
    exercise: String,
    weight: String,
    reps: String,
    date: Date
});

module.exports = mongoose.model('Bodyweight', BodyweightSchema);
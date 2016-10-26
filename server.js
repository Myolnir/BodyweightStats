//server.js

//BASE SETUP
//=============================================================
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var bodyweightRoutes = require('./routes/bodyweight');
var userRoutes = require('./routes/users')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds019986.mlab.com:19986/bodyweight'); // connect to our database

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', bodyweightRoutes);
app.use('/api', userRoutes);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Bodyweight app is working on ' + port);
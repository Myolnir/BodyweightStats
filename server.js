//server.js

//BASE SETUP
//=============================================================
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds019986.mlab.com:19986/bodyweight'); // connect to our database

var Bodyweight = require('./models/bodyweight');



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});
// more routes for our API will happen here

// on routes that end in /bodyweights
// ----------------------------------------------------
router.route('/bodyweights')

// create a bodyweight (accessed at POST http://localhost:8080/api/bodyweights)
.post(function(req, res) {

    function newBodyweight() {
        var bodyweight = new Bodyweight();      // create a new instance of the Bodyweight model
        bodyweight.exercise = req.body.exercise;  // set the bodyweight name (comes from the request)
        bodyweight.weight = req.body.weight;
        bodyweight.reps = req.body.reps;
        return bodyweight;
    }

    var bodyweight = newBodyweight();

    // save the bear and check for errors
    bodyweight.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Bodyweight created!' });
    });

})

// get all the bodyweights (accessed at GET http://localhost:8080/api/bodyweights)
.get(function(req, res) {
    Bodyweight.find(function(err, bodyweights) {
        if (err)
            res.send(err);

        res.json(bodyweights);
    });
});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Bodyweight app is working on ' + port);
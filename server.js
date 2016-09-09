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

var port = process.env.PORT || 3000;        // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds019986.mlab.com:19986/bodyweight'); // connect to our database

var Bodyweight = require('./models/bodyweight');



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Ah petition has arrived');
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

        res.json({ message: 'Bodyweight created successfully!' });
    });

})

// get all the bodyweights (accessed at GET http://localhost:8080/api/bodyweights)
.get(function(req, res) {
    Bodyweight.find(function(err, bodyweights) {
        if (err)
            res.send(err);

        res.json(bodyweights);
    });
})

// on routes that end in /bodyweights/:bodyweight_id
// ----------------------------------------------------
router.route('/bodyweights/:bodyweight_id')

// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bodyweight.findById(req.params.bodyweight_id, function(err, bodyweight) {
            if (err)
                res.send(err);
            
            
            res.json(bodyweight)
        })
    })

    // update the bodyweight with this id (accessed at PUT http://localhost:8080/api/bodyweight/:bodyweight_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Bodyweight.findById(req.params.bodyweight_id, function(err, bodyweight) {

            if (err)
                res.send(err);


            // update our bodyweight info
            if (req.body.exercise != null && req.body.exercise != ""){
                bodyweight.exercise = req.body.exercise;
            }  
            if (req.body.weight != null && req.body.weight != "") {
                bodyweight.weight = req.body.weight;
            }
            if(req.body.reps != null && req.body.reps != ""){
                bodyweight.reps = req.body.reps;
            }

            // save the bodyweight
            bodyweight.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bodyweight updated successfully!' });
            });

        });
    })

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bodyweight/:bodyweight_id)
    .delete(function(req, res) {
        Bodyweight.remove({
            _id: req.params.bodyweight_id
        }, function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bodyweight successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Bodyweight app is working on ' + port);
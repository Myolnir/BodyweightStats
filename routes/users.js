var express = require('express');
var router = express.Router();

var User = require("../models/users")

/* Status endpoint. */
router.get('/', function(req, res, next) {
    res.json({ message: 'hooray! users welcome to our api!' });
});

/* users endpoint */

router.route('/users')

    .get(function(req, res){
        User.find(function(err, users) {
           if (err)
               res.send(err);

           res.json(users);
       })

    })

    .post(function(req, res) {
        function newUser(){
            var newUser = new User();
            newUser.name = req.body.name;
            newUser.surname = req.body.surname;
            newUser.birthdate = req.body.birthdate;
            newUser.creationDate = Date.now();
            return newUser;
        }

        var newUser = newUser();


        newUser.save(function(err){
            if (err)
                res.send(err);

            res.json({ message: 'User created successfully!' });
        })



})

module.exports = router;

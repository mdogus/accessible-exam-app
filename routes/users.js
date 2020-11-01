var express = require('express');
var router = express.Router();
//Models
const User = require("../models/User");
//Fetching data
router.route("/fetch-users").get(function(req, res) {
    User.find({}, function(err, docs) {
        if (err) {
            res.send(err);
        } else {
            res.send(docs);
        }
    });
});

//JS/Nodejs Projects/ejs-demo
// use res.render to load up an ejs view file
// Users page
router.get('/users', function(req, res) {
    User.find({}, function(err, docs) {
        if (err) {
            res.send(err);
        } else {
            res.render('pages/users', {
                users: docs
            });
        }
    });
});

// about page
//router.get('/about', function(req, res) {
//    res.render('pages/about');
//});


module.exports = router;

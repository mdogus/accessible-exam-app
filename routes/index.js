var express = require('express');
var router = express.Router();
//Models
const User = require("../models/User");
//logger_service
const Logger = require('../services/logger-service');
const logger = new Logger('login');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Express' });
});

// Login page
router.get('/login', function(req, res) {
    res.render('pages/usr-login');
});

// SignUp page
router.get('/sign-up', function(req, res) {
    res.render('pages/sign-up');
});
router.post('/sign-up', async (req, res) => {
    let newUser = new User(req.body);
    
    try {
        newUser.save(function(err, doc) {
            if (err) {
                console.log(err);
                logger.logger.log("error", err);
                res.send(err);
            } else {
                console.log("User saved successfully:" + JSON.stringify(req.body.name) + " " + JSON.stringify(req.body.surname));
                logger.logger.log("info", "User saved successfully: %s %s", JSON.stringify(req.body.name), JSON.stringify(req.body.surname));
                res.redirect("/usr-logs");
            }
        });
    } catch {
        console.log("Failed to save user.");
        logger.logger.log("error", "Failed to save user.");
        res.redirect("/sign-up");
    }
});

// POST user
router.post('/users/add', function(req, res) {
    let newUser = new User(req.body);
    
    newUser.save(function(err, doc) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log("User saved successfully");
            console.log(req.body);
            res.send(doc);
        }
    });
});

module.exports = router;

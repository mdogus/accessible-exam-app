var express = require('express');
var router = express.Router();
//Models
const logs = require("../models/Log");
const User = require("../models/User");
//Passport
const passport = require("passport");
require("../config/passport");
//logger_service
const Logger = require('../services/logger-service');
const logger = new Logger('login');

//Admin homepage
router.get('/admin', checkAuthenticatedAdmin, (req, res) => {
    //TODO: Yönetici yetkiniz bulunmamaktadır
    //res.render("pages/index", { errors: { message: "Yönetici yetkiniz bulunmamaktadır!"}})
    res.render('pages/admin-home', {
        name: req.user.name,
        surname: req.user.surname
    });
});
//Admin Login page
router.get('/admin/login', checkNotAuthenticatedAdmin, (req, res) => {
    res.render('pages/admin-login');
});
router.post('/admin/login', checkNotAuthenticatedAdmin, passport.authenticate('local', {
    successRedirect: "/admin",
    failureRedirect: '/admin/login',
    successFlash: true,
    failureFlash: true
}))
//Admin sign-up page
router.get('/admin/sign-up', checkAuthenticatedAdmin, (req, res) => {
    res.render('pages/admin-sign-up');
});
router.post('/admin/sign-up', checkAuthenticatedAdmin, async (req, res) => {
    const newUser = new User(req.body);
    
    try {
        newUser.save(function(err, doc) {
            if (err) {
                console.log(err);
                logger.logger.log("error", err);
                res.send(err);
            } else {
                console.log("User saved successfully:" + JSON.stringify(req.body.name) + " " + JSON.stringify(req.body.surname));
                logger.logger.log("info", "User saved successfully: %s %s", JSON.stringify(req.body.name), JSON.stringify(req.body.surname));
                res.redirect("/admin");
            }
        });
    } catch {
        console.log("Failed to save user.");
        logger.logger.log("error", "Failed to save user.");
        res.redirect("/admin/sign-up");
    }
});

//Users
router.get('/admin/users', checkAuthenticatedAdmin, function(req, res) {
    User.find({}, function(err, docs) {
        if (err) {
            res.send(err);
        } else {
            //res.send(docs);
            res.render('pages/admin-users', {
                users: docs
            });
        }
    });
});

//User logs
router.get('/admin/logs', checkAuthenticatedAdmin, function(req, res) {
    logs.find({}, function(err, docs) {
        if (err) {
            res.send(err);
        } else {
            //res.send(docs);
            res.render('pages/admin-user-logs', {
                logs: docs
            });
        }
    });
});
//Delete user logs
router.post('/admin/delete-logs', checkAuthenticatedAdmin, function(req, res) {
    try {
        logs.deleteMany({}, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log('User Logs successfully deleted');
                res.redirect("/admin/logs");
            }
        });
      
    } catch (err) {
      console.log(err);
    }
    //res.redirect('/admin/logs');
    /*logs.deleteMany({ level: 'info'}, function(err, docs) {
        if (err) {
            res.send(err);
        }
        //} else {
          //  res.redirect('/admin/logs');
        //}
    });*/
});

//Fetching data
router.route("/fetch").get(function(req, res) {
    logs.find({}, function(err, docs) {
        if (err) {
            res.send(err);
        } else {
            res.send(docs);
        }
    });
});

//User authentication
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}
//Admin authentication
function checkAuthenticatedAdmin(req, res, next) {
  if (req.isAuthenticated() && (req.user.email === "mdogusm@gmail.com") && (req.user.password === "vivalacoffee1210")) {
    return next()
  }
  res.redirect('/admin/login')
}
function checkNotAuthenticatedAdmin(req, res, next) {
  if (req.isAuthenticated() && (req.user.email === "mdogusm@gmail.com") && (req.user.password === "vivalacoffee1210")) {
    return res.redirect('/admin')
  }
  next()
}

module.exports = router;

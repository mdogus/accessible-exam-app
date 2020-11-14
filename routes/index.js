var express = require('express');
var router = express.Router();
//form validation
const formValidation = require("../services/formValidation");
//Models
const User = require("../models/User");
//JWT
//const jwt = require("jsonwebtoken");
//Passport
const passport = require("passport");
require("../config/passport");
//logger_service
const Logger = require('../services/logger-service');
const logger = new Logger('login');

/* GET home page. */
router.get('/', checkAuthenticated, (req, res, next) => {
    res.render('pages/index', {
        //title: "Ana Sayfa | Engelsiz Sınav Uygulaması",
        name: req.user.name,
        surname: req.user.surname
    });
});
//Login page
router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('pages/user-login');
});
router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: '/login',
    successFlash: true,
    failureFlash: true
}));

// Login about page
router.get('/about', checkNotAuthenticated, function(req, res) {
    res.render('pages/about');
});

// User home about page
router.get('/user-about', checkAuthenticated, function(req, res) {
    res.render('pages/user-about');
});

// Login contact page
router.get('/contact', checkNotAuthenticated, function(req, res) {
    res.render('pages/contact');
});

// User home contact page
router.get('/user-contact', checkAuthenticated, function(req, res) {
    res.render('pages/user-contact');
});

//Test page
router.get('/exam', checkAuthenticated, function(req, res) {
    //res.render('pages/index');
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
  if (req.isAuthenticated() && (req.user.email === "mdogusm@gmail.com") && (req.user.password === "abcd1234")) {
    return next()
  }
  res.redirect('/admin/login')
}
function checkNotAuthenticatedAdmin(req, res, next) {
  if (req.isAuthenticated() && (req.user.email === "mdogusm@gmail.com") && (req.user.password === "abcd1234")) {
    return res.redirect('/admin')
  }
  next()
}

/*
//form validation
const { email, password } = req.body;
const errors = [];
const validationErrors = formValidation.loginValidation(email, password);

if (validationErrors.length > 0) {
    res.render("pages/login", { data: req.body, errors: validationErrors });
}

User.findOne({ email })
.then(user => {
    if (!user) {
        errors.push({ message: "Lütfen girirdiğiniz e-posta adresini kontrol edin." })
        return res.render("pages/login", { data: req.body, errors });
    }
})
.catch(err => console.log(err));*/

module.exports = router;

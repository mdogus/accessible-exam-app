var express = require('express');
var router = express.Router();
//form validation
const formValidation = require("../services/formValidation");
//Models
const User = require("../models/User");
//controller
const controller = require("../controller/user-controller");
//JWT
//const jwt = require("jsonwebtoken");
//Passport
const passport = require("passport");
require("../config/passport");
//logger_service
const Logger = require('../services/logger-service');
const logger = new Logger('user-logs');

var msgPersonalInfo = "";

/* GET home page. */
router.get('/', checkAuthenticated, (req, res, next) => {
    logger.logger.log("info", "Ana Sayfa açıldı.")
    res.render('pages/index', {
        //title: "Ana Sayfa | Engelsiz Sınav Uygulaması",
        name: req.user.name,
        surname: req.user.surname,
        email: req.user.email,
        age: req.user.age,
        msgPersonalInfo: msgPersonalInfo
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
    logger.logger.log("info", "Page: Login-Hakkında sayfası açıldı.")
    res.render('pages/about');
});

// User home about page
router.get('/user-about', checkAuthenticated, function(req, res) {
    logger.logger.log("info", "Page: Hakkında sayfası açıldı.")
    res.render('pages/user-about');
});

// Login contact page
router.get('/contact', checkNotAuthenticated, function(req, res) {
    logger.logger.log("info", "Page: Login-İletişim sayfası açıldı.")
    res.render('pages/contact');
});

//User home: Contact page
router.get('/user/contact', checkAuthenticated, function(req, res) {
    logger.logger.log("info", "Page: İletişim sayfası açıldı.")
    res.render('pages/user-contact');
});

//Kişisel bilgi formu
//User home: Personal info page
router.get('/user/personal-info', checkAuthenticated, function(req, res) {
    res.render("pages/user-form-info", {
        name: req.user.name,
        surname: req.user.surname,
        email: req.user.email,
        age: req.user.age
    });
    logger.logger.log("info", "Page: Kişisel Bilgi Formu sayfası açıldı.")
});
//router.post('/user/save-personal-info', checkAuthenticated, controller.updateUser);
router.post('/user/save-personal-info', checkAuthenticated, async (req, res) => {
    const user = req.body;
    const msg = "Personal Info saved successfully!\nAd: " + user.name + "\nSoyad: " + user.surname + "\nYaş: " + user.age + "\nCinsiyet: " + user.gender + "\nOkul: " + user.studentVar1 + ", " + user.studentVar2 + "\nMeslek: " + user.job + "\nKişisel Teknolojier: " + user.personalTechs + "\nYardımcı Teknolojiler: " + user.assistiveTechs + "\nİşletim sistemi: " + user.opSystem;
    
    msgPersonalInfo = "Kişisel Bilgi Formu kaydedilmiştir. Teşekkür ederiz.";
    
    try {
        //Add new fields
        /*await User.updateMany({},
        [{$set: { "age": "" }},
         {$set: { "gender": "" }},
         {$set: { "studentVar1": "" }},
         {$set: { "studentVar2": "" }},
         {$set: { "job": "" }},
         {$set: { "personalTechs": [] }},
         {$set: { "assistiveTechs": "" }},
         {$set: { "opSystem": [] }}],
        { multi: true }, function (err, doc) {
            if (err) return err;
            console.log('The doc response from Mongo was ', doc);
        });*/
        await User.updateOne({ "email": user.email },
                             [{$set: { "age": user.age }},
                              {$set: { "gender": user.gender }},
                              {$set: { "studentVar1": user.studentVar1 }},
                              {$set: { "studentVar2": user.studentVar2 }},
                              {$set: { "job": user.job }},
                              {$set: { "personalTechs": user.personalTechs }}], function(err, doc) {
            if (err) {
                console.log(err);
                logger.logger.log("error", err);
                res.send(err);
            } else {
                console.log(msg);
                logger.logger.log("info", msg)
                //req.flash("message", "Kişisel Bilgi Formu kaydedilmiştir. Teşekkür ederiz.");
                res.redirect("/");
            }
        });
    } catch {
        console.log("Failed to save personal info.");
        logger.logger.log("error", "Failed to save personal info.");
        res.redirect("/login");
    };
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

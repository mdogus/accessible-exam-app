var express = require('express');
var router = express.Router();
//form validation
const formValidation = require("../services/formValidation");
//Models
const User = require("../models/User");
//JWT
const jwt = require("jsonwebtoken");
//Passport
const passport = require("passport");
require("../config/passport");
//const initializePassport = require("../config/passport");
//initializePassport(
//    passport,
//    email => User.find(user => user.email === email),
//    id => User.find(user => user.id === id)
//);
//initializePassport(passport);

//logger_service
const Logger = require('../services/logger-service');
const logger = new Logger('login');
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('pages/index', {
        title: "Giriş Yap | Engelsiz Sınav Uygulaması",
        data: { },
        errors: { }
    });
});
//Login page
router.get('/login', (req, res) => {
    res.render('pages/login');
});
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
        successFlash: true
    })(req, res, next);
});
        /*
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


//Passport: Login page POST passport
/*router.post('/login',
            passport.authenticate("local", { failureRedirect: '/login' }),
    (req, res) => {
    const { email, password } = req.body;
    res.redirect('/usr-logs');
});*/

// SignUp page
router.get('/sign-up', function(req, res) {
    res.render('pages/sign-up');
});
router.post('/sign-up', async (req, res) => {
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
                res.redirect("/");
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

// JWT User authenticate
router.post('/authenticate', (req, res) => {
    const { email, password } = req.body;
    
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log(err);
            logger.logger.log("error", err);
            throw err;
        }
        if (!user) {
            console.log("Girdiğiniz e-posta adresi bulunamadı. Lütfen kontrol ederek tekrar giriniz.");
            logger.logger.log("error", "Girdiğiniz e-posta adresi bulunamadı. Lütfen kontrol ederek tekrar giriniz.");
            res.json({
                status: false,
                message: "Authentication error: Email not verified!"
            });
            //return done(null, false, { message: "Girdiğiniz e-posta adresi bulunamadı. Lütfen kontrol ederek tekrar giriniz." });
        } else {
            if (user.password !== (password)) {
                console.log("Lütfen parolayı kontrol ederek tekrar giriniz.");
                logger.logger.log("error", "Lütfen parolayı kontrol ederek tekrar giriniz.");
                res.json({
                    status: false,
                    message: "Authentication error: Password not verified!"
                });
                //return done(null, false, { message: "Lütfen parolayı kontrol ederek tekrar giriniz." });
            } else {
                const payload = { email };
                const token = jwt.sign(payload, req.app.get("api_secret_key"), { expiresIn: 720 });
                res.json({
                    status: true,
                    message: "Email and password verified.",
                    token
                });
            }
        }
        
        //return done(null, user);
    });
});

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

module.exports = router;

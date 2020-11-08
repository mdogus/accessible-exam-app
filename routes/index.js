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
router.get('/', checkAuthenticated, (req, res, next) => {
    res.render('pages/index', {
        title: "Giriş Yap | Engelsiz Sınav Uygulaması"
        //data: { },
        //errors: { }
    });
});
//Login page
router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('pages/login');
});
router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: "/",
  failureRedirect: '/login',
  failureFlash: true
}));

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

//Admin Login page
router.get('/admin/login', checkNotAuthenticatedAdmin, (req, res) => {
    res.render('pages/admin-login');
});
router.post('/admin/login', checkNotAuthenticatedAdmin, passport.authenticate('local', {
  successRedirect: "/admin",
  failureRedirect: '/admin/login',
  failureFlash: true
}))
//Admin homepage
router.get('/admin', checkAuthenticatedAdmin, (req, res) => {
    //TODO: Yönetici yetkiniz bulunmamaktadır
    //res.render("pages/index", { errors: { message: "Yönetici yetkiniz bulunmamaktadır!"}})
    res.render('pages/admin-home');
});
// Admin - SignUp page
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
//Require admin
function requireAdmin() {
    return function(req, res, next) {
        User.findOne({ req.body.username }, function(err, user) {
            if (err) { return next(err); }

            if (!user) {
                // Do something - the user does not exist
            }

            if (!user.admin) {
                // Do something - the user exists but is no admin user
            }

            // Hand over control to passport
            next();
        });
    }
}*/

function hasAuthorization(req, res, next) {
    if (req.isAuthenticated() && (req.user.role >= 2)) {
        return next();
    }
    return res.redirect(403, "/error");
}
/*
function checkAuthorization(isAuthenticated, isAdmin) {
    return function(req, res, next) {
        if (isAuthenticated == true) {
            if (req.isAuthenticated()) {
                return next()
            }
            res.redirect('/login')
        } else {
            if (req.isAuthenticated()) {
              if (isAdmin == true) {
                  if ((req.user.email === "mdogusm@gmail.com") && (req.user.password === "abcd1234")) {
                      return res.redirect("/admin");
                  } else {
                      return res.redirect("/");
                  }
              }
            }
            return next()
        }
    }
}*/
/*
function isAdmin(req, res, next) {
    if (req.isAuthenticated() && (req.user.email === "mdogusm@gmail.com") && (req.user.password === "abcd1234")) {
        return next()
    }
    res.redirect("/");
}*/
module.exports = router;

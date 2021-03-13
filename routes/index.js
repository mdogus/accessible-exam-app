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
    logger.logger.log("info", "Login/Hakkında sayfası açıldı.")
    res.render('pages/about');
});

// User home about page
router.get('/user-about', checkAuthenticated, function(req, res) {
    logger.logger.log("info", "Hakkında sayfası açıldı.")
    res.render('pages/user-about');
});

// Login contact page
router.get('/contact', checkNotAuthenticated, function(req, res) {
    logger.logger.log("info", "Login/İletişim sayfası açıldı.")
    res.render('pages/contact');
});

//User home: Contact page
router.get('/user/contact', checkAuthenticated, function(req, res) {
    logger.logger.log("info", "İletişim sayfası açıldı.")
    res.render('pages/user-contact');
});

// Login: User guide page
router.get('/user-guide', checkNotAuthenticated, function(req, res) {
    logger.logger.log("info", "Login/Kullanım Kılavuzu sayfası açıldı.");
    res.render('pages/user-guide');
});
// User home: User guide page
router.get('/user/user-guide', checkAuthenticated, function(req, res) {
    logger.logger.log("info", "Kullanım Kılavuzu sayfası açıldı.");
    res.render('pages/user-guide');
});

// User sign-up page
router.get('/sign-up', checkNotAuthenticatedAdmin, (req, res) => {
	console.log("Kayıt Ol sayfası görüntülendi.");
                logger.logger.log("info", "Kayıt Ol sayfası görüntülendi.");
    res.render('pages/user-sign-up');
});
router.post('/sign-up', checkNotAuthenticatedAdmin, async (req, res) => {
    const newUser = new User(req.body);
    
    try {
        newUser.save(function(err, doc) {
            if (err) {
                console.log(err);
                logger.logger.log("error", err);
                res.send(err);
            } else {
                console.log("Kullanıcı başarıyla kaydedildi:" + JSON.stringify(req.body.name) + " " + JSON.stringify(req.body.surname));
                logger.logger.log("info", "Kullanıcı başarıyla kaydedildi: %s %s", JSON.stringify(req.body.name), JSON.stringify(req.body.surname));
                res.redirect("/login");
            }
        });
    } catch {
        console.log("Failed to save user.");
        logger.logger.log("error", "Failed to save user.");
        res.redirect("/admin/sign-up");
    }
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
    logger.logger.log("info", "Kişisel Bilgi Formu sayfası açıldı.")
});
//router.post('/user/save-personal-info', checkAuthenticated, controller.updateUser);
router.post('/user/save-personal-info', checkAuthenticated, async (req, res) => {
    const user = req.body;
    const msg = "Kişisel Bilgi Formu başarıyla kaydedildi.! \nAd: " + user.name + "\nSoyad: " + user.surname + "\nYaş: " + user.age + "\nCinsiyet: " + user.gender + "\nGörme Engeli Durumu: " + user.visualImpairment + "\nOkul: " + user.studentVar1 + ", " + user.studentVar2 + "\nMeslek: " + user.job + "\nKişisel Teknolojier: " + user.personalTechs + "\nYardımcı Teknolojiler: " + user.assistiveTechs + "\nİşletim sistemi: " + user.opSystem + "\nİnternet Tarayıcı: " + user.browser;
    
    msgPersonalInfo = "Kişisel Bilgi Formu kaydedilmiştir. Teşekkür ederiz.";
    
    try {
        //Add new fields
        /*await User.updateMany({},
        [{$set: { "age": "" }},
         {$set: { "gender": "" }},
         {$set: { "visualImpairment": "" }},
         {$set: { "studentVar1": "" }},
         {$set: { "studentVar2": "" }},
         {$set: { "studentVar3": "" }},
         {$set: { "job": "" }},
         {$set: { "personalTechs": [] }},
         {$set: { "assistiveTechs": "" }},
         {$set: { "opSystem": [] }},
         {$set: { "browser": [] }},
         {$set: { "theme": "theme3" }},
         {$set: { "font": "font_0" }},
         {$set: { "fontSize": "18" }}],
        { multi: true }, function (err, doc) {
            if (err) return err;
            console.log('The doc response from Mongo was ', doc);
        });*/
        await User.updateOne({ "email": user.email },
                             [{$set: { "age": user.age }},
                              {$set: { "gender": user.gender }},
                              {$set: { "visualImpairment": user.visualImpairment }},
                              {$set: { "studentVar1": user.studentVar1 }},
                              {$set: { "studentVar2": user.studentVar2 }},
                              //{$set: { "studentVar3": user.studentVar3 }},
                              {$set: { "job": user.job }},
                              {$set: { "personalTechs": user.personalTechs }},
                              {$set: { "assistiveTechs": user.assistiveTechs }},
                              {$set: { "opSystem": user.opSystem }},
                              {$set: { "browser": user.browser }}], function(err, doc) {
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

//Accessibility settings
router.post('/user/save-acc-settings', checkAuthenticated, async (req, res) => {
    const user = req.body;
    const msg = (user) => {
		var theme;
		var font;
		if (user.theme === "theme1") {
			theme = "Beyaz Üzeri Siyah";
		} else if (user.theme === "theme-sepia") {
			theme = "Sepya Üzeri Siyah";
		} else if (user.theme === "theme-pink") {
			theme = "Pembe Üzeri Siyah";
		} else if (user.theme === "theme-yellow") {
			theme = "Sarı Üzeri Siyah";
		} else if (user.theme === "theme-lime") {
			theme = "Yeşil Üzeri Siyah";
		} else if (user.theme === "theme2") {
			theme = "Siyah Üzeri Beyaz";
		} else if (user.theme === "theme3") {
			theme = "Siyah Üzeri Sarı";
		} else if (user.theme === "theme4") {
			theme = "Siyah Üzeri Yeşil";
		}
		
		if (user.font === "font_0") {
			font = "Arial";
		} else if (user.font === "font_1") {
			font = "Arial Black";
		} else if (user.font === "font_2") {
			font = "Century Gothic";
		} else if (user.font === "font_3") {
			font = "Chalkboard";
		} else if (user.font === "font_4") {
			font = "Comic Sans";
		} else if (user.font === "font_5") {
			font = "Helvetica";
		} else if (user.font === "font_6") {
			font = "Tahoma";
		} else if (user.font === "font_7") {
			font = "Times New Roman";
		} else if (user.font === "font_8") {
			font = "Trebuchet";
		} else if (user.font === "font_9") {
			font = "TTKB Dik Temel Yazı";
		} else if (user.font === "font_10") {
			font = "Verdana";
		}
		return "Erişilebilirlik Ayarları başarıyla kaydedildi: Ad-Soyad: " + user.name + " " + user.surname + ", Tema Rengi: " + theme + ", Yazı Tipi: " + font + ", Yazı Boyutu: " + user.fontSize;
	};
    
    try {
        await User.updateOne({ "email": user.email },
                             [{$set: { "theme": user.theme }},
                              {$set: { "font": user.font }},
                              {$set: { "fontSize": user.fontSize }}], function(err, doc) {
            if (err) {
                console.log(err);
                logger.logger.log("error", err);
                res.send(err);
            } else {
                console.log(msg(user));
                logger.logger.log("info", msg(user))
            }
        });
    } catch {
        console.log("Failed to save Accessibility Settings.");
        logger.logger.log("error", "Failed to save Accessibility Settings.");
    };
});


//Test page
router.get('/exam', checkAuthenticated, function(req, res) {
    res.render('pages/exam', {
        theme: req.user.theme,
        font: req.user.font,
        fontSize: req.user.fontSize
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

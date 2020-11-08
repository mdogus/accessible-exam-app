const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//const bcrypt = require("bcrypt");
//logger_service
const Logger = require('../services/logger-service');
const logger = new Logger('passport');
const User = require("../models/User");

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    }, (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
        if (err) {
            console.log(err);
            logger.logger.log("error", err);
            return done(err, null, "Bir hata oluştu!");
        }
        if (!user) {
            console.log("Girdiğiniz e-posta adresi bulunamadı. Lütfen kontrol ederek tekrar giriniz.");
            logger.logger.log("error", "Girdiğiniz e-posta adresi bulunamadı. Lütfen kontrol ederek tekrar giriniz.");
            return done(null, false, { message: "Girdiğiniz e-posta adresi bulunamadı. Lütfen kontrol ederek tekrar giriniz." });
        }
        if (user.password !== password) {
            console.log("Lütfen parolayı kontrol ederek tekrar giriniz.");
            logger.logger.log("error", "Lütfen parolayı kontrol ederek tekrar giriniz.");
            return done(null, false, { message: "Lütfen parolayı kontrol ederek tekrar giriniz." });
        } else {
            console.log("${user.name} ${user.surname}, giriş yaptı.");
            logger.logger.log("info", "%s %s %s", user.name, user.surname, " giriş yaptı.");
        }
        return done(null, user, { message: "Kullanıcı girişi başarılı." });
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
 
passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

/*
//Web dev simplified
function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email);
        if (user == null) {
            return done(null, false, { message: 'Email not found!' });
        }

        try {
            if (bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect!' })
            }
        } catch (e) {
            return done(e)
        }
    };

    passport.use(new LocalStrategy({ email: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    });
}
*/

//module.exports = initialize;

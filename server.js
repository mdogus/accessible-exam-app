//var path = require('path');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
//const cookieParser = require("cookie-parser");
var app = express();
//JWT config
//const jwtConfig = require("./config/jwtConfig");
//app.set("api_secret_key", jwtConfig.api_secret_key);
//JWT middleware: verify token
//const verifyToken = require("./services/verify-token");
//Passport
const passport = require("passport");
//Express flash
const flash = require("express-flash");
//Express session
const session = require("express-session");
//Routes
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/index');
//logger_service
const Logger = require('./services/logger-service');
const logger = new Logger('app');
//MongoDB connection
//const mongoose = require("mongoose");
const database = require("./config/database.js")();
//Add new fields to User schema
//database.user.update({}, {$set: { age: [] }, { multi:true }});

//Set view engine
app.set('view engine', 'ejs');

//Ajax
app.use(express.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));
//Passport, Express flash and session
//app.use(cookieParser("passport"));
app.use(flash());
app.use(session({
    //cookie: { maxAge: 60000 },
    secret: "passport",
    resave: false,
    saveUninitialized: false
  })
);
//app.use(expressSession({
//    secret: app.get("api_secret_key"),
//    resave: false,
//    saveUninitialized: false
//}));
app.use(passport.initialize());
app.use(passport.session())

//Routes
//app.use(express.static('public'));
app.use('/test', express.static(__dirname + '/public'));
app.use('/', usersRouter);
app.use('/', adminRouter);
app.use('/', loginRouter);
//app.use('/', verifyToken);

//Serves all the request which includes /images in the url from Images folder
//app.use('/images', express.static(__dirname + '/Images'));

//Global res.flash middleware
/*app.use((req, res, next) => {
    //Passport flashes
    res.locals.passportFailure = req.flash("error");
    res.locals.passportSuccess = req.flash("success");
    //Logged in user
    res.locals.user = req.user;
    next();
});*/

console.log("Starting server: "+__dirname);
logger.info("Server started.");

var server = app.listen(process.env.PORT || 5000);

//Ajax
//app.get('/', (req, res) => {
//    res.sendFile(__dirname + '/index.html');
//});

//logger_service
app.post('/log', (req, res) => {
    const body = req.body;
    console.log(body.event);
    logger.logger.log("info", body.event);
    let error = {};
});
app.post('/exam', (req, res, next) => {
    const body = req.body;
    console.log(body.event);
    logger.logger.log("info", body.event);
	next();
});

//Logout
app.get('/logout', (req, res) => {
    logger.logger.log("info", "Uygulamadan çıkış yapıldı.");
	req.logout();
    res.redirect('/login');
});

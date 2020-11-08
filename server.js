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
//const initializePassport = require("./config/passport");
//initializePassport(passport);
//Express flash
const flash = require("express-flash");
//Express session
const expressSession = require("express-session");
//Routes
var logsRouter = require('./routes/logs');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/index');
//logger_service
const Logger = require('./services/logger-service');
const logger = new Logger('app');
//MongoDB connection
const database = require("./config/database.js")();

//Set view engine
app.set('view engine', 'ejs');

//Ajax
app.use(express.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));
//Passport, Express flash and session
//app.use(cookieParser("passport"));
app.use(flash());
app.use(
  expressSession({
    //cookie: { maxAge: 60000 },
    resave: true,
    secret: "passport",
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
app.use('/', logsRouter);
app.use('/', loginRouter);
//app.use('/', verifyToken);

//Serves all the request which includes /images in the url from Images folder
//app.use('/images', express.static(__dirname + '/Images'));

//Global res.flash middleware
app.use((req, res, next) => {
    //Passport flashes
    res.locals.passportFailure = req.flash("error");
    res.locals.passportSuccess = req.flash("success");
    //Logged in user
    res.locals.user = req.user;
    next();
});

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
    
    // Adding body of the request as log data
    //logger.setLogData(body)
    //logger.info("Request recieved at /", body);
    
    // We are expecting name,age and gender in the body of the request
    /*
    if (body.element == null || body.element == "") {
        logger.error("Element field is empty")
        error["element"] = "element field is empty"
    }
    if (body.event == null || body.event == "") {
        logger.error("Event field is empty")
        error["event"] = "event field is empty"
    }
    if (body.description == null || body.description == "") {
        logger.error("Description field is empty")
        error["description"] = "description field is empty"
    }*/
    /*
    if (Object.keys(error).length != 0) {
        logger.error("Return error response", {
            "success": false
        })
        res.send("Error")
    } else {
        logger.info("Return success response", {
            "success": true
        })
        console.log(body)
        res.send("")
    }*/
});


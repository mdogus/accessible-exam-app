//var path = require('path');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
//Routes
var logsRouter = require('./routes/logs');
var loginRouter = require('./routes/index');

//logger_service
const Logger = require('./services/logger-service');
const logger = new Logger('app');
//MongoDB connection
const database = require("./config/database.js")();

//Set view engine
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));

//Ajax
app.use(express.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.static('public'));
app.use('/test', express.static(__dirname + '/public'));
//Routes
app.use('/', logsRouter);
app.use('/', loginRouter);

//Serves all the request which includes /images in the url from Images folder
//app.use('/images', express.static(__dirname + '/Images'));


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


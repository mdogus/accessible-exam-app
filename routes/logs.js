var express = require('express');
var router = express.Router();
//Models
const logs = require("../models/Log");
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

//JS/Nodejs Projects/ejs-demo
// use res.render to load up an ejs view file
// index page
router.get('/usr-logs', function(req, res) {
    logs.find({}, function(err, docs) {
        if (err) {
            res.send(err);
        } else {
            //res.send(docs);
            res.render('pages/usr-logs', {
                logs: docs
            });
        }
    });
    /*
    var logs = [
        { level: 'Sammy', message: "DigitalOcean" },
        { level: 'Tux', message: "Linux" },
        { level: 'Moby Dock', message: "Docker" }
    ];
     
    //Udemy
    const promise = Log.find({});
    promise.then((data) => {
        console.log(data);
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
    
    
    For POST method
    //const {id, timeStamp, level, message, meta} = req.body;
    const log = new Log({
        timeStamp: timeStamp,
        level: level,
        message: message,
        meta: meta
    });
    log.send((err, data) => {
        if (err) res.json(err);
        res.json({ status: 1 });
    });
    
    //Yukarıdakinin yerine şu şekilde kullanılabilir:
    const log = new Log(req.body);
    const promise = log.save();
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
    */
});

// about page
router.get('/about', function(req, res) {
    res.render('pages/about');
});


module.exports = router;

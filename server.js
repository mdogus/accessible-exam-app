
var express = require('express');
var app = express();

app.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
app.use('/images', express.static(__dirname + '/Images'));

console.log("Starting server:"+__dirname);

var server = app.listen(5000);
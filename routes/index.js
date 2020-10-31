var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Express' });
});

// Login page
router.get('/login', function(req, res) {
    res.render('pages/usr-login');
});

// SignUp page
router.get('/signup', function(req, res) {
    res.render('pages/sign-up');
});

module.exports = router;

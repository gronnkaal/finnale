var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET slash */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Admin' });
});

/* GET login */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login', message: req.flash('loginMessage')});
});

/* GET signup */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup', message: req.flash('signupMessage')});
});

/* POST signup */
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

/* GET profile */
router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('profile', {
    user : req.user
  });
});

/* GET logout */
router.get('/logout', function(req, res, next) {
  res.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
};

module.exports = router;

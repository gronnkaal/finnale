
// routes/index.js

var express = require('express');
var router  = express.Router();


module.exports = function (passport) {

	router.get('/', function(req, res, next) {
		res.render('index', { title: 'Admin', user: req.user });
	});

	//
	//
	//

	router.get('/login', function(req, res, next) {
		res.render('login', { message: req.flash('loginMessage') }); 
	});

	router.get('/signup', function(req, res) {
		res.render('signup', { message: req.flash('signupMessage') });
	});

	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	//
	//

	router.post('/signup', passport.authenticate('signup', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	router.post('/login', passport.authenticate('login', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	//
	//

	return router;

};

function isAuthenticated(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
};

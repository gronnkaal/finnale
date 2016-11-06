// config/passport.js

var Strategy = require('passport-local').Strategy;
var User     = require('./user');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //
    // =============== SIGNUP ===============
    //

    passport.use('signup', new Strategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        
        process.nextTick(function() {
            
            User.findOne({ 'email' :  email }, function(err, user) {
                
                if (err)
                
                    return done(err);
                
                if (user) {

                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                
                } else {

                    var newUser      = new User();
                    newUser.email    = email;
                    newUser.password = newUser.generateHash(password);
                    
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });

                }
            });    
        });

    }));
    
    //
    // =============== LOGIN ===============
    //

    passport.use('login', new Strategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {

        User.findOne({ 'email' :  email }, function(err, user) {

            if (err)
                return done(err);

            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            return done(null, user);
        });

    }));

};
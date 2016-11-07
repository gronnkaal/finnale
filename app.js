
// app.js

// set up ===================================================

var express  	 = require('express');
var app		 	 = express();

var path	 	 = require('path');
var morgan	 	 = require('morgan');
var favicon  	 = require('serve-favicon');

var flash    	 = require('connect-flash');
var session      = require('express-session');
var passport	 = require('passport');
var mongoose 	 = require('mongoose');
var bodyParser 	 = require('body-parser');
var cookieParser = require('cookie-parser');
var MongoStore	 = require('connect-mongo')(session);

// config ====================================================

var configMongoUri = process.env.MONGODB_URI;
var configSessionSecret = process.env.SESSION_SECRET;

// routes ====================================================

var index	= require('./routes/index');
var ice	  	= require('./routes/ice');

// setup mongodb connection
mongoose.connect(configMongoUri);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
	secret: configSessionSecret,
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		autoRemove: 'native'
	})
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// initialize passport auth
myPassport = require('./models/passport');
myPassport(passport);

// setup routes
app.use('/', index(passport));
app.use('/ice', ice);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

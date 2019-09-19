var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');
var pg

if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config()
}

var app = express();

const db = require('./database/knex')

// db.reset();
// db.create();

// const port = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

var sess = {
	secret: 'keyboard cat',
	cookie: {
		maxAge: 30 * 24 * 60 * 60 * 1000 // 30 Days
	},
	saveUninitialized: false,
	store: new (require('connect-pg-simple')(session))(),
	resave: false,
}

if(process.env.NODE_ENV === 'production') {
	app.set('trust proxy', 1);
	sess.cookie.secure = true;
}
app.use(session(sess))

var pointsRouter = require('./routes/points');
var usersRouter = require('./routes/users');

app.use('/points', pointsRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	console.log("Error?")
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send(err);
});

module.exports = app;

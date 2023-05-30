var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const { cookieJwtAuth } = require('./middleware/cookieJwtAuth');

var authRoutes = require('./routes/authRoutes');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const loginUserRoutes = require('./routes/loginUser');
const signupUserRoutes = require('./routes/signupUser');
//const getProfileUserRoutes = require('./routes/getProfileUser');
// updateProfileUserRoutes = require('./routes/updateProfileUser');
//const registerUserRoutes = require('./routes/registerUser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(cookieParser());
app.use(authRoutes);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', signupUserRoutes);
app.use('/api', loginUserRoutes);
//app.use('/api', getProfileUserRoutes);
//app.use('/api', updateProfileUserRoutes);
//app.use('/api', registerUserRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

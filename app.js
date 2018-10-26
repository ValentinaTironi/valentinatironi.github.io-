var createError = require('http-errors');
var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');
var wheaterRouter = require('./routes/api/wheater');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/wheater', wheaterRouter);

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

app.locals.capitalize_first_letter = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

app.locals.random_image = function(hola) {
  var backgrounds =[
    'ui card background-1', 
    'ui card background-2',
    'ui card background-3',
    'ui card background-5',
    'ui card background-6'
  ]
  var image = Math.floor(Math.random()*backgrounds.length);
  return backgrounds[image];
}
module.exports = app;

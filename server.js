var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./app/models/user');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(flash());
app.use(cookieParser());

app.use(session(
  {
    name: 'session',
    keys: ['key1234567890', 'key1234567890']
  }
));

//configure passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect('mongodb://localhost/datnode');

app.listen('3000');
console.log('server listens on port 3000');

require('./app/routes.js')(app, passport);

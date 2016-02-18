// dependencies
var express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    hash = require('bcrypt-nodejs'),
    path = require('path'),
    passport = require('passport'),
    localStrategy = require('passport-local' ).Strategy;

// user model
var User = require('./app/models/user.js');

// create instance of express
var app = express();

// configuration ------------------------------------------

// mongoose
// mongoose.connect('mongodb://localhost/messageDB');
//ec2 db -- user:ethan pwd: ethan; db: messageDB
mongoose.connect('mongodb://ethan:ethan@ec2-107-23-47-197.compute-1.amazonaws.com:27017/messageDB');

// require routes for login api
var routes = require('./app/loginApi.js');

// define middleware
//static means html, css, js files, and we put those files in the 'public' dir
app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, './public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.use('/user/', routes);

//?????? this route should put here, otherwise app.post('/messages', data) wont work, why??????
// routes for api.js (message api)
require('./app/api.js')(app);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});

module.exports = app;

app.listen(3000);
console.log("Server running on port 3000");
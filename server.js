var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var config = require('./config');
var path = require('path');

import User from './app/models/user';
import Hangout from './app/models/hangout';

import { hangout as hangoutSchema } from './app/models/hangout.js';

//Facebook Authentication
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var configDB = require('./config');

//pass passport for configuration
require('./app/authentication/facebook_passport')(passport);

//read cookies (needed for auth)
app.use(cookieParser());

//required for passport
app.use(session({
    //session secret
    secret: config.secret,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
//persistent login sessions
app.use(passport.session());
//use connect-flash for flash messages stored in session
app.use(flash());

//load our routes and pass in our app and fully configured passport
require('./app/authentication/fb_routes')(app, passport);

//Yelp
var request = require('request');
var qs = require('querystring');

var fs = require('fs');

var Promise = require('bluebird');

// This asks for the POST information to be application/x-www-urlencoded
// Instead of using data: {key: value} format.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;

//Database Part
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect(config.database);
app.set('secret', config.secret);

app.use(morgan('dev'));

import apiRouter from './app/routing/api_router';
import router from './app/routing/router';
import getEvent from './app/routing/yelp_data';

import yelpRouter from './app/routing/yelp_router';
import hangoutRouter from './app/routing/hangout_router';
import restaurantActivity from './app/routing/restaurant_activity';
import parseJSON from './app/routing/parse_json';


//Register Our Routes Here
app.use('/', router);
app.use('/api', apiRouter);
app.use('/api/yelp', yelpRouter);
app.use('/api/hangout', hangoutRouter);
app.use('*', function (req, res) {
 res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const server = app.listen(port);

console.log('Magic happens on port ' + port); 

import socketio from 'socket.io';
import io from './app/routing/socketio_client.js';

io(socketio.listen(server));

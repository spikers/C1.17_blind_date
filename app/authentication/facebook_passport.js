import mongoose from 'mongoose';
var Promise = require('bluebird');
var FacebookStrategy = require('passport-facebook').Strategy;
import User from '../../app/models/user';
var configAuth = require('../../config');

module.exports = function(passport) {
    //passport session setup required for persistent login sessions
    //passport needs ability to serialize and unserialize users out of session
    //used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    var fbStrategy = configAuth.facebookAuth;
    //allows us to pass in the req from our route to let us check if a user is logged in or not
    fbStrategy.passReqToCallback = true;
    passport.use(new FacebookStrategy(fbStrategy,
        function (req, token, refreshToken, profile, done) {
            process.nextTick(function () {
                // check if the user is already logged in
                if (!req.user) {
                    User.findOne({'fbToken': profile.id}, function (err, user) {
                        if (err) {
                            return done(err);
                        }
                        if (user) {
                            //if there is a user id already but no token because user was linked at one point and then removed
                            user.given_name = profile.name.givenName;
                            user.family_name = profile.name.familyName;
                            user.email = (profile.emails[0].value || '').toLowerCase();
                            user.profile_picture = (profile.photos[0].value);
                            user.gender = profile.gender;
                            user.save(function (err) {
                                if (err) {
                                    return done(err);
                                } else {
                                    return done(null, user);
                                }
                            });
                            //user found, return that user
                            return done(null, user);
                        }
                        else {
                            //if there is no user, create them
                            var newUser = new User();
                            newUser.fbToken = profile.id;
                            newUser.given_name = profile.name.givenName;
                            newUser.family_name = profile.name.familyName;
                            newUser.email = (profile.emails[0].value || '').toLowerCase();
                            newUser.profile_picture = (profile.photos[0].value);
                            newUser.gender = profile.gender;
                            newUser.save(function (err) {
                                if (err)
                                    return done(err);

                                    return done(null, newUser);
                            });
                        }
                    });
                }
                else {
                    //user already exists and is logged in, we have to link accounts
                    // pull the user out of the session
                    var user = req.user;
                    user.fbToken = profile.id;
                    user.given_name = profile.name.givenName;
                    user.family_name = profile.name.familyName;
                    user.email = (profile.emails[0].value || '').toLowerCase();
                    user.profile_picture = (profile.photos[0].value);
                    user.gender = profile.gender;
                    user.save(function (err) {
                        if (err)
                            return done(err);

                            return done(null, user);
                    });
                }
            });
        }));
};
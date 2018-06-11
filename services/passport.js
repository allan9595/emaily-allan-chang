const keys = require('../config/keys');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users'); //pull users out of mongoose , This is a model Class

passport.serializeUser((user, done) => {
  done(null, user.id); //user.id is the mongo records ID not profile ID
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null , user); //Asyc connection to MongoDB
    });
});

passport.use(
  new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback', //this is the url that include "code" sent from Google
  proxy: true // trust all the proxy server, in here we trust heroku proxy server
},
  async (accessToken, refreshToken, profile, done) => {//existingUser respresents model instance
    const existingUser = await User.findOne({ googleId: profile.id })
    if(existingUser){
      return done(null, existingUser);//if the user exist, we doing nothing
    }
    const user = await new User({googleId: profile.id}).save();
    done(null, user);//create a model instance, Asyc promise

  })
);

const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const passport = require('passport');

const { v4: uuidv4 } = require('uuid');
const { UserModel } = require('../models/user.model');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
 async function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        let email = profile._json.email;
        let picture = profile._json.picture.replace(96,340);

        const user  = new UserModel({
            email,
            name:profile._json.name,
            picture,
            password: uuidv4()
        });
        console.log(profile)
        console.log(user)
        await user.save();
      return cb(null, user);
    // });
    // console.log(profile);
  }
));
module.exports = { passport }
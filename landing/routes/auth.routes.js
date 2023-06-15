const express = require("express");
const jwt = require('jsonwebtoken')
const authRoute = express.Router();
const passport = require("passport");
const { UserModel } = require("../models/user.model");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const { v4: uuidv4 } = require('uuid');

//google outh
authRoute.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] })
);
authRoute.get("/auth/google/callback", passport.authenticate('google', {
  // successRedirect: '/auth/google/success', failureRedirect: '/google/failure',
  session: false
}), (req, res) => {
  let user = req.user;
  if (user) {
    // console.log(user)

    // res.cookie(`accessToken`, accessToken,{ maxAge: 3600000 })
    // res.cookie(`rerefreshToken`, rerefreshToken)
    // res.cookie('user', JSON.stringify(user))
    user.password = undefined;
    res.redirect(`http://127.0.0.1:5500/landing/frontEnd/landing.html?userdata=${encodeURIComponent(JSON.stringify(user))}`)
    
  } else {
    res.send('failed to connect')
  }
}
);
// // successRedirect: '/auth/google/success', failureRedirect: '/google/failure',
// authRoute.get('/auth/google/success', (req, res) => {
//   // const user = req.user;
//   // console.log(res)
//   res.redirect("http://127.0.0.1:5500/landing/frontEnd/landing.html")
// });
// authRoute.get('/google/failure', (req, res) => {
//   res.send('failed to connect')
// })
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
passport.use(

  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        let email = profile._json.email;
        var user = await UserModel.findOne({ email })
        // console.log(user)
        if (user) {
          return done(null, user);
        } else {
          let name = profile._json.name;
          let picture = profile._json.picture.replace(96, 340);
          const user = new UserModel({ email, name, picture, password: uuidv4() });
          await user.save();
          return done(null, user);
        }
      } catch (error) {
        console.log(error)
        return done(error)
      }
    }
  )
);
module.exports = {
  authRoute
};

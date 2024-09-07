const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const regUser = require('../model/regUser');
const jwt = require('jsonwebtoken');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists in our db
        const existingUser = await regUser.findOne({ googleId: profile.id });
        if (existingUser) {
          // We already have a record with the given profile ID
          return done(null, existingUser);
        }
        
        // If not, create a new user record
        const newUser = await regUser.create({
          username: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        done(null, newUser);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await regUser.findById(id);
  done(null, user);
});

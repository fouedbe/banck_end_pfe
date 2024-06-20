// middlewares/passport.js
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {User} = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      console.log('JWT payload received:', jwt_payload); // Log the JWT payload
      const user = await User.findById(jwt_payload.id);
      if (user) {
        console.log('User found:', user); // Log the user if found
        return done(null, user);
      } else {
        console.log('User not found'); // Log if user not found
        return done(null, false);
      }
    } catch (err) {
      console.error('Error in JWT Strategy:', err); // Log any errors
      return done(err, false);
    }
  })
);

module.exports = passport;

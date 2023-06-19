const facebookStrategy = require('passport-facebook').Strategy

require('dotenv').config();

// Models
const UserModel = require('../models/UserModel');

const facebookObj = {
  // pull in our app id and secret from our auth.js file
  clientID        : process.env.FACEBOOK_APP_ID,
  clientSecret    : process.env.FACEBOOK_APP_SECRET,
  callbackURL     : process.env.BASE_URL + process.env.Server_PORT + "/api/facebook/callback",
  profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)','email']
}// facebook will send back the token and profile

const facebookCallback = function(token, refreshToken, profile, done) {
  console.log("facebookStrategy");
  // asynchronous
  process.nextTick(async function() {
      // find the user in the database based on their facebook id

      //Custom Code
      const user = await UserModel.findOne({email : profile.emails[0].value});
     console.log(profile.picture);
      if (user) {
          return done(null, user); // user found, return that user
      } else {
          // if there is no user found with that facebook email, create them
          var newUser = new UserModel();
          // set all of the facebook information in our user model
          newUser.uid    = profile.id; // set the users facebook id                  
          newUser.name  = profile.name.givenName;
          newUser.lastname  = profile.name.familyName;
          newUser.email = profile.emails[0].value;
          newUser.city = '';
          newUser.password = process.env.App_Default_Password;
          newUser.img = profile.photos[0].value;
          newUser.provider = profile.provider;

          // save our user to the database
          newUser.save() 
          // if successful, return the new user
          return done(null, newUser);
      }
  })

}

// Export 
module.exports = new facebookStrategy(facebookObj, facebookCallback)

var passport = require('passport');
var FacebookStrategy = require('passport-facebook');

// Models
const UserModel = require('../models/UserModel');

const facebookObj = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3001/redirect/facebook'
}

let facebookCallback = async function(accessToken, refreshToken, profile, cb) {
  // profile conterrà tutte le informazioni che mi fornirà il login di facebook
  const user = await UserModel.findOne({email : profile.email});
  if(!user) {
    // Non ho l'utente salvato nel mio DB
    // Quindi lo salvo
    const saveUserDb = new UserModel({
      ...profile
      // aggiungo altri campi
    })
    saveUserDb.save();
    return cb(null, saveUserDb);
  }
  return cb(null, user);
   
}

passport.use(new FacebookStrategy(facebookObj, facebookCallback));

// Export 
module.exports = FacebookStrategy;
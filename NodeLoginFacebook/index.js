const express = require('express')
const app = express()
const cors = require('cors');
const passport = require('passport')
//const cookieParser = require('cookie-parser')
const session = require('express-session')
const User = require('./models/User')
const facebookStrategy = require('passport-facebook').Strategy

app.set("view engine","ejs")

// Middlewares
app.use(cors());
app.use(session({ secret: 'sessionUserLogin' }));
app.use(passport.initialize());
app.use(passport.session());
//app.use(cookieParser());
app.use((req, res, next) => { 
    console.log("Request at " + req.url + " - Method: " + req.method );
    //console.log(req.headers)
    next();
});

passport.use(new facebookStrategy({
    // pull in our app id and secret from our auth.js file
    clientID        : "221959033500134",
    clientSecret    : "0ae781a900fdcf72898e70f9a672dfd4",
    callbackURL     : "http://localhost:3001/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)','email']
 
},// facebook will send back the token and profile
function(token, refreshToken, profile, done) {
    console.log("facebookStrategy");
    // asynchronous
    process.nextTick(async function() {
        //console.log(profile);
        // find the user in the database based on their facebook id

        //Custom Code
        const user = await User.findOne({email : profile.emails[0].value});
        //console.log(user)
       
        if (user) {
            console.log("User found")
            //console.log(user)
            return done(null, user); // user found, return that user
        } else {
            console.log("User NOT DB")
            // if there is no user found with that facebook id, create them
            var newUser = new User();
            // set all of the facebook information in our user model
            newUser.uid    = profile.id; // set the users facebook id                  
            newUser.token = token; // we will save the token that facebook provides to the user                    
            newUser.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
            newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
            newUser.gender = profile.gender
            newUser.pic = profile.photos[0].value
            // save our user to the database
            newUser.save() 
            // if successful, return the new user
            return done(null, newUser);
        }
    })
 
}));
 
passport.serializeUser(function(user, done) {
    done(null, user.uid);
});
 
// used to deserialize the user
passport.deserializeUser(function(id, done) {
    findUser = User.findById(id);
    //console.log("deserializeUser: ", findUser);
    done(null, findUser);
});

app.get('/logout', function(req, res) {
    //req.logout();
    res.redirect('/');
});
 
app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
        user : req.user // get the user out of session and pass to template
    });
});
 
// route middleware to make sure
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}
 
app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
 
app.get('/facebook/callback', passport.authenticate('facebook', { successRedirect : '/profile', failureRedirect : '/'}));
 
app.get('/',(req,res) => { res.render("index") })
 
app.listen(3001,() => {
    console.log("App is listening on Port 3001")
})
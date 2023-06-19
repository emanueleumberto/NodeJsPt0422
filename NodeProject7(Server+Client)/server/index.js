const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Login Facebook
const session = require('express-session')
const passport = require('passport');

require('dotenv').config();

const app = express();
const port = process.env.Server_PORT || 3000;

// Models
const UserModel = require('./models/UserModel');

// Middlewares start
app.use(cors());
app.use(express.json());
const debug = require("./middlewares/debug")
app.use(debug.logUrl);

// Login Facebook
app.use(session({ secret: 'sessionUserLogin' }));
app.use(passport.initialize());
app.use(passport.session());

// Endpoints
const AuthEndpoints = require('./endpoints/Auth');
app.use(AuthEndpoints);
const UsersEndpoints = require('./endpoints/Users');
app.use(UsersEndpoints);

// Fare la build dell'applicazione lato client e caricarlo in questa cartella nel server
// './public/client_build'
/* app.use(express.static(path.join(__dirname, './public/client_build')))
app.get("*", (req, res, next) => {
    // path della attuale esecuzione
    console.log(__dirname);
    res.sendFile(path.join(__dirname, './public/client_build'))
}) */

const FacebookStrategy = require('./middlewares/OAuth');
passport.use(FacebookStrategy);

passport.serializeUser(function(user, done) {
    console.log(user)
    done(null, user._id);
});
 
// used to deserialize the user
passport.deserializeUser(function(id, done) {
    findUser = UserModel.findById(id);
    done(null, findUser);
});

// Middlewares end
app.use(debug.errorHandler);

mongoose.connect(process.env.MONGODB_CONNECT).then(response => {
    console.log("DB Connect!")
    app.listen(port, () => {
        console.log("Server listening on port " + port)
    })
}).catch(err => {console.log("Error connecting: " + err.message)});

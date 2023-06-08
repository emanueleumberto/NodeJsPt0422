const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.APP_PORT || 3000;

// Models
const userModel = require('./models/UserModel');

// Middlewares start
app.use(cors());
app.use(express.json());

const debug = require("./middlewares/debug")
app.use(debug.logUrl);

// Endpoints
const AuthEndPoints = require("./endpoints/Auth");
const AppEndPoints = require("./endpoints/Users");
app.use(AuthEndPoints);
app.use(AppEndPoints);

// Middlewares end
app.use(debug.errorHandler);

// Start Mongoose e Server
mongoose
    .connect(process.env.APP_URL_MONGODB)
    .then(response => {
        console.log("DB Connected...");
        app.listen(port, async () => console.log("Server listening on port " + port))
    }).catch(err => console.log(err))
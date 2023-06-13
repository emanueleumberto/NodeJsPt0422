const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Models

// Middlewares start
app.use(cors());
app.use(express.json());

// Endpoints
const AuthEndpoints = require('./endpoints/Auth');
app.use(AuthEndpoints);

// Middlewares end


mongoose.connect(process.env.MONGODB_CONNECT).then(response => {
    console.log("DB Connect!")
    app.listen(port, () => {
        console.log("Server listening on port " + port)
    })
}).catch(err => {console.log("Error connecting: " + err.message)});

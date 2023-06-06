const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const debug = require("./middlewares/debug")
app.use(debug.logUrl);

// Models
const userModel = require("./models/Users")

// EndPoints
const endPoints = require("./endpoints/Users_EndPoints")
app.use(endPoints);

// Middleware ErrorHandler
app.use(debug.errorHandler);

mongoose
    .connect('mongodb+srv://admin:root@cluster0.rpwcfk4.mongodb.net/MioDB')
    .then(response => {
        console.log("DB Connected...");
        app.listen(3000, async () => console.log("Server listening on port " + 3000))
    }).catch(err => console.log(err))
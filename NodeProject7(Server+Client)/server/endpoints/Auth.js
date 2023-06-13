const express = require('express');
const routers = express.Router();
const bcrypt = require('bcrypt');
// jwt

const saltRounds = 10;
const bcriptPassword = process.env.APP_PASSWORD_BCRIPT;

// Models
const UserModel = require('../models/UserModel')

// Auth Endpoints

routers.post('/register', (req, res, next) => {
    const password = req.body.password;
    // BCript HASH
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            // Store hash in your password DB.
            // Creo un oggetto ModelUser
            const user = new UserModel(
                {
                    ...req.body,
                    password: hash,
                    verified: false
                })
                await user.save();
                console.log(user)
                return res.status(201).json(user);
        });
    });




    const user = req.body;
    //console.log(user)
    res.status(201).json(user);
})

routers.post('/login', (req, res, next) => {
    const user = req.body;
    console.log(user)
})

routers.post('/autologin', (req, res, next) => {

})

// Export routers
module.exports = routers;
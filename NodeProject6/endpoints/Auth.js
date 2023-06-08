const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const jwtSecretKey = process.env.APP_JWT_SECRET_KEY;

// Models
const UserModel = require("../models/UserModel");

/*
    // Oggetto che mi invierà il client
    {
        "fullname": "John Smith"
        "username": "johnsmith",
        "email": "johnsmith@example.com"
        "password": "pa$$word"
        //"verified": false
    }
*/

router.post('/register', (req, res, next) => {
    /* const obj = req.body;
    obj.verified = false;
    const user = new UserModel(obj);
    await user.save();
    res.status(201).json(user); */

    const password = req.body.password;

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            // Store hash in your password DB.
            //console.log(hash)
            const user = new UserModel({
                ...req.body,
                password: hash,
                verified: false
            });
            await user.save();
            res.status(201).json(user);
        });
    });

})

/*
    // Oggetto che mi invierà il client
    {
        "username": "johnsmith",
        "password": "pa$$word"
    }
*/

router.post('/login', async (req, res, next) => {
    const username  = req.body.username;
    const userLogin = await UserModel.findOne({username: username});
    if(userLogin) {
        // controllo la password
        const log = bcrypt.compare(req.body.password, userLogin.password)
        if(log) {
            // Generare un JWT Token
            const token = jwt.sign(
            { 
                id: userLogin._id,
                username: userLogin.username,
                email: userLogin.email,
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
            }, 
            jwtSecretKey);
            res.status(200).json(token)
        } else {
            res.status(400).json({error: 'Invalid Password'})
        }
    } else {
        res.status(400).json({error: 'Invalid Username'})
    }
})

// Export Router
module.exports = router;
const express = require('express');
const routers = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const saltRounds = 10;
const jwtSecretKey = process.env.APP_JWT_SECRET_KEY;
require('dotenv').config();

// Models
const UserModel = require('../models/UserModel')

// Middlewares
const upload = require('../middlewares/uploadImg')

// Auth Endpoints

routers.post('/api/register', upload.single('uploadFile'), (req, res, next) => {
    const data = req.file ? req.file.path : '' ; // Prendo il percorso del salvataggio su coudinaryd del file immagine
    const password = req.body.password;
    //console.log(req.body, req.file)

        // BCript HASH
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                // Store hash in your password DB.
                //console.log(hash)
                const user = new UserModel({
                    ...req.body,
                    password: hash,
                    img: data,
                    verified: false
                });
                await user.save();
                return res.status(201).json(user);
            });
        });
})

routers.post('/api/login', async (req, res, next) => {
    const user = req.body;
    const userLogin = await UserModel.findOne({email: req.body.email});
    if(!userLogin) {
        return res.status(400).json({error: 'Invalid Email'})
    } else {
        // controllo la password
        const log = await bcrypt.compare(req.body.password, userLogin.password)
        //console.log(log);
        if(!log) {
            return res.status(400).json({error: 'Invalid Password'})
        }
        // Generare un JWT Token
        const token = jwt.sign(
            { 
                id: userLogin._id,
                name: userLogin.name,
                lastname: userLogin.lastname,
                email: userLogin.email,
                img: userLogin.img
            }, 
            jwtSecretKey,
            {expiresIn : '1h'});
            return res.status(200).json(token)
    }
})

routers.post('/api/autologin', (req, res, next) => {

})

routers.get('/api/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

routers.get('/api/facebook/callback', passport.authenticate('facebook', { 
                                        failureRedirect : process.env.BASE_URL + process.env.Client_PORT + '/login',
                                        failureMessage: true }),
                                                function(req, res) {
                                                    console.log("RespTest: ", req.user)
                                                    // Generare un JWT Token
                                                    const token = jwt.sign(
                                                        { 
                                                            id: req.user._id,
                                                            name: req.user.name,
                                                            lastname: req.user.lastname,
                                                            email: req.user.email,
                                                            img: req.user.img
                                                        }, 
                                                        jwtSecretKey,
                                                        {expiresIn : '1h'});
                                                        res.redirect(process.env.BASE_URL + process.env.Client_PORT + '/api/' + token);
                                        });

// Export routers
module.exports = routers;
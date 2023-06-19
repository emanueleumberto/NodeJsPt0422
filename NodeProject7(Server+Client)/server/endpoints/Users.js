const express = require('express');
const routers = express.Router();
require('dotenv').config();

// Models
const UserModel = require('../models/UserModel')

// Middlewares
const auth = require("../middlewares/AuthMiddleware")

routers.get('/api/users', auth, async (req, res, next) => {
    const users = await UserModel.find();
    return res.status(200).json(users);
})

// Export routers
module.exports = routers;
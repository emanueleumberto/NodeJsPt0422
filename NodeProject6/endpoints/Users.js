const express = require('express');
const router = express.Router();

// Models
const UserModel = require("../models/UserModel");

// Middlewares
const auth = require("../middlewares/AuthMiddleware")

router.get('/', (req, res, next) => {
    return res.status(200).json({message: 'Hello world!'});
})

router.get('/users', auth, async (req, res, next) => {
    const allUsers = await UserModel.find();
    return res.status(200).json(allUsers);
})

// Export Router
module.exports = router;
const express = require('express');
const router = express.Router();

// Models
const userModel = require("../models/Users")

router.get('/users', async (req, res, next) => {
    res.status(200).json(await userModel.find());
})

router.get('/users/:id', async (req, res, next) => {
    try {
        res.status(200).json(
            await userModel.findById(
                req.params.id
            )
        );
    } catch (err) {
        //res.status(400).json({error: "User ID not found"}, ...err);
        next();
    }
})

router.post('/users', async (req, res, next) => {
    //const obj = req.body;
    //const newUser = new userModel(obj);
    //const dbResp = await newUser.save();
    //res.status(201).json(dbResp)
    res.status(201).json(
        await (new userModel(req.body)).save()
    )
})

router.put('/users/:id', async (req, res, next) => {
    //const id = req.params.id;
    //const obj = req.body;
    //const user = await userModel.findByIdAndUpdate(id, obj)
    try {
    res.status(200).json(
        await userModel.findByIdAndUpdate(
                        req.params.id, 
                        req.body))
    } catch (err) {
        //res.status(400).json({error: "User ID not found"}, ...err);
        next();
    }
})

router.delete('/users/:id', async (req, res, next) => {
    try {
    res.status(200).json(
        await userModel.findByIdAndDelete(req.params.id))
    } catch (err) {
        //res.status(400).json({error: "User ID not found"}, ...err);
        next();
    }
})

module.exports = router;
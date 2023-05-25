const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        }
    }
);

const userModel = mongoose.model("Users", userSchema);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/users', async (request, response) => {
    const allUsers = await userModel.find();
    return response.status(200).json(allUsers);
});

app.get('/users/:id', async (request, response) => {
    const id = request.params.id;
    try {
        const user = await userModel.findById(id);
        return response.status(200).json(user);
    } catch(err) {
        response.status(500).json({error: "Utente non trovato", ...err})
    }
});

app.get('/users/city/:city', async (request, response) => {
    const city = request.params.city;
    const queryString = request.query;
    console.log(queryString);
    try {
        //const usersCity = await userModel.findOne({city: city})
        // Sort {name: 1} crescente -> {name: -1} decrescente

        const limit = queryString.limit;
        const skip = (queryString.page-1) * limit;

        console.log(limit, skip);

        const usersCity = await userModel
                                    .find({city: city})
                                    .sort({name: 1, lastname: 1})
                                    .limit(limit)
                                    .skip(skip)
        return response.status(200).json(usersCity);
    } catch(err) {
        response.status(500).json({error: "Utente non trovato", ...err})
    }
})

app.post('/users', async (request, response) => {
    const obj = request.body;
    console.log(obj);
    const newUser = userModel(obj);
    const dbResp = await newUser.save();
    return response.status(200).json(dbResp);
})

app.put('/users/:id', async (request, response) => {
    const id = request.params.id;
    const obj = request.body;
    try {
        const editUser = await userModel.findByIdAndUpdate(id, obj);
        return response.status(200).json(editUser);
    } catch(err) {
        response.status(500).json({error: "Utente non trovato", ...err})
    }
})

app.delete('/users/:id', async (request, response) => {
    const id = request.params.id;
    try {
        await userModel.findByIdAndDelete(id);
        return response.status(200).json({});
    } catch(err) {
        response.status(500).json({error: "Utente non trovato", ...err})
    }
})

async function start() {
    try {
        await mongoose.connect('mongodb+srv://admin:root@cluster0.rpwcfk4.mongodb.net/PT0422');
        app.listen(port, () => console.log('Server attivo sulla porta 3000!!!'));
    } catch(err) {
        console.error(err);
    }
}

start();

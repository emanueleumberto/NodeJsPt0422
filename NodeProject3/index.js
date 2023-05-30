const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use(logMiddle);

function logMiddle(request, response, next) {
    console.log("Sono logMiddle", request.url);
    if(request.url === '/users') {
        return response.status(401).send("Non Autorizzato!!!")
    } 
    next();

}

function logSingleMiddle(request, response, next) {
    console.log("Sono SingleMiddle", request.url);
    next();
}

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
        address: {
            type: {
                city: String,
                state: String
            },
            required: true
        },
        age: {
            type: Number,
            required: true,
        },
        contacts: {
            type: [String],
            default: []
        }
    }
);

const userModel = mongoose.model("Users", userSchema);

app.get('/',  (request, response) => {
    response.send("Primo Endpoint!!!!")
});

app.get('/users', async (request, response) => {
    const allUsers = await userModel.find();
    return response.status(200).json(allUsers);
});

// 
app.get('/users/params', logSingleMiddle, async (request, response) => {
    // http://localhost:3001/users/params?age=DESC&name=ASC&size=2&page=2
    // sort(1, -1) - limit(0) - skip
    // age, name, lastname
    console.log('query', request.query);
    let orderParam = {};
    if(request.query.age) {orderParam = {...orderParam , age: request.query.age === 'ASC' ? 1 : -1}}
    if(request.query.name) {orderParam = {...orderParam , name: request.query.name === 'ASC' ? 1 : -1}}
    if(request.query.lastname) {orderParam = {...orderParam , lastname: request.query.lastname === 'ASC' ? 1 : -1}}
    console.log(orderParam);

    //Limit quanti elementi restiruire al client
    const limit = request.query.size ? request.query.size : 10;

    //Skip quanti elementi saltare
    const skip = (request.query.page ? request.query.page -1 : 0) * limit;
    
    const allUsers = await userModel.find().sort(orderParam).limit(limit).skip(skip);
    return response.status(200).json(allUsers);
})

app.get('/users/:id', async (request, response, next) => {
    const id = request.params.id;
    try {
        if(+id == 0) throw new Error("Invalid id!!!")
        
        const user = await userModel.findById(id);
        return response.status(200).json(user);
  
    } catch(err) {
        //response.status(500).json({error: "Utente non trovato", ...err})
        next(err)
    }
});

app.post('/users', async (request, response) => {
    const obj = request.body;
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
        //response.status(500).json({error: "Utente non trovato", ...err})
        next(err)
    }
})

app.delete('/users/:id', async (request, response) => {
    const id = request.params.id;
    try {
        await userModel.findByIdAndDelete(id);
        return response.status(200).json({});
    } catch(err) {
        //response.status(500).json({error: "Utente non trovato", ...err})
        next(err)
    }
})

function errorHandler(error, request, response, next) {
    const e = error.toString();
    console.error("Sono il middleware errorHandler!! " + e);
    return response.status(500).send(e);
}

app.use(errorHandler);

mongoose.connect('mongodb+srv://admin:root@cluster0.rpwcfk4.mongodb.net/MioDB').then(response => {
    app.listen(port, () => console.log("Server attivo sulla porta " + port))
}).catch(err => console.error(err))

/* async function start() {
    try {
        await mongoose.connect('mongodb+srv://admin:root@cluster0.rpwcfk4.mongodb.net/PT0422');
        app.listen(port, () => console.log('Server attivo sulla porta 3000!!!'));
    } catch(err) {
        console.error(err);
    }
}

start(); */
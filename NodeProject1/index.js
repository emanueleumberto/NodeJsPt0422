//import express from 'express';
const express = require('express');

const app = express();

app.use(express.json());

let users = [
    {id: 1, name: 'John', lastname: 'Doe', email: 'j.doe@example.com', city: 'London'},
    {id: 2, name: 'Mario', lastname: 'Rossi', email: 'm.rossi@example.com', city: 'Roma'},
    {id: 3, name: 'Giuseppe', lastname: 'attivo', email: 'g.attivo@example.com', city: 'San Francisco'}
]

app.get('/', (request, response) => {
    return response.send("<h1>Ciao a tutti!!!</h1>");
});

app.get('/users', (request, response) => {
    return response.json(users);
});

app.get('/users/:id', (request, response) => {
    const id = request.params.id;
    //const idNum = Number(id);
    //const idNum = parseInt(id);
    const obj = users.find(user => user.id === +id);
    return response.json(obj);
});

app.post('/users', (request, response) => {
    const obj = request.body;
    obj.id = users.length +1;
    users.push(obj);
    return response.status(201).json(obj);
})

app.put('/users/:id', (request, response) => {
    const id = request.params.id;
    const obj = request.body;
    const index = users.findIndex(user => user.id === +id);
    users[index] = obj;
    return response.status(200).json(obj);
})

app.delete('/users/:id', (request, response) => {
    const id = request.params.id;
    users = users.filter(user => user.id != id);
    return response.status(200).json({});
})


app.listen(3000, () => console.log('Server attivo sulla porta 3000!!!'));
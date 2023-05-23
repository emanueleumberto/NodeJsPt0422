const { json } = require("body-parser")

let obj = {name: 'John', lastname: 'Doe', email: 'j.doe@example.com', city: 'London'}

// POST
fetch('http://localhost:3000/users', {
    method: 'POST', 
    body: JSON.stringify(obj)})
    .then(response => response.json())
    .then(json => console.log(json));

// PUT
fetch('http://localhost:3000/users/2', {
    method: 'PUT', 
    body: JSON.stringify(obj)})
    .then(response => response.json())
    .then(json => console.log(json));
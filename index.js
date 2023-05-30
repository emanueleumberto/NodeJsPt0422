const { json } = require("body-parser");
const { response } = require("express");

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


let data = [];

let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/users');
xhr.send()
xhr.onreadystatechange = () => {
    console.log('change');
    if(xhr.readyState === 4 && xhr.status === 200) {
        data = JSON.parse(xhr.responseText);
    }
}

console.log(data); // []

let p = fetch('http://localhost:3000/users/2').then(response => response.json());


p.then(json => console.log(json));


let arr = [2,6,8,7,1,9,5]
arr.sort();
let arrCopy = arr.slice(0,3);


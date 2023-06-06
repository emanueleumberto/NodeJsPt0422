const mongoose = require("mongoose");

// Mongoose Schema
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

// Mongoose Model
const userModel = mongoose.model("Users", userSchema);

// Export Module
module.exports = userModel;



// Relazioni DB Mongo
// Embedding - Referencing
// OneToOne - OneToMany - ManyToMany

// Embedding
/* let users = [
    {
        _id: 1,
        name: 'Mario',
        lastname: 'Rossi',
        address: {
            city: 'Roma',
            state: 'Italia'
        },
        age: 45,
        posts: [
            {
                _id: 1,
                title: 'Primo Post',
                text: 'Descrizione Post numero 1',
                date: '2023-06-05'
            },
            {
                _id: 2,
                title: 'Secondo Post',
                text: 'Descrizione Post numero 2',
                date: '2023-06-06'
            }
        ]
    }, 
    {
        _id: 2,
        name: 'Giuseppe',
        lastname: 'Verdi',
        address: {
            city: 'Roma',
            state: 'Italia'
        },
        age: 21,
        posts: [
            {
                _id: 1,
                title: 'Post di Giuseppe',
                text: 'Descrizione Post di Giuseppe',
                date: '2023-06-03'
            }
        ]
    }
];

 */
// Referencing

// Users
/* users = [
    {
        _id: 1,
        name: 'Mario',
        lastname: 'Rossi',
        address: 1,
        age: 45,
        posts: [1, 2]
    }, 
    {
        _id: 2,
        name: 'Giuseppe',
        lastname: 'Verdi',
        address: 1,
        age: 21,
        posts: [3]
    }
];

// Address
let Address = [
    {
        _id: 1,
        city: 'Roma',
        state: 'Italia'
    },
    {
        _id: 2,
        city: 'Milano',
        state: 'Italia'
    },
    {
        _id: 3,
        city: 'Napoli',
        state: 'Italia'
    }
]

// Posts
let posts = [
    {
        _id: 1,
        title: 'Primo Post',
        text: 'Descrizione Post numero 1',
        date: '2023-06-05',
        author_id: 1
    },
    {
        _id: 2,
        title: 'Secondo Post',
        text: 'Descrizione Post numero 2',
        date: '2023-06-06',
        author_id: 1
    },
    {
        _id: 3,
        title: 'Post di Giuseppe',
        text: 'Descrizione Post di Giuseppe',
        date: '2023-06-03',
        author_id: 2
    }
] */
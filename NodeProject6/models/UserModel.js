const mongoose = require("mongoose");

// Mongoose Schema
const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        verified: {
            type: Boolean,
            required: true,
            default: false
        }
    }
);

// Mongoose Model
const userModel = mongoose.model("UsersLogin", userSchema);

// Export Module
module.exports = userModel;
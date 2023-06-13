const mongoose = require('mongoose');

// Mongose Schema
const UserSchema = new mongoose.Schema(
    {
        name: String,
        lastname: String,
        city: String,
        email: { type: String, required: true },
        password: { type: String, required: true },
        verified: { type: Boolean, default: false }
    }
)

// Mongoose model
const userModel = mongoose.model('UserLogin', UserSchema)

// Export Model
module.exports = userModel;
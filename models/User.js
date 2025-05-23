// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['admin', 'teacher', 'student'], // Defining allowed roles
        default: 'student' // Default role is student
    }
});

module.exports = mongoose.model('User', UserSchema);

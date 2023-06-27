const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    cellphone: {
        type: Number,
        required: true
    },
    preference: {
        type: [String],
        required: true,
        enum: ["Hombre", "Mujer", "Hombre Trans", "Mujer Trans", "No Binarie"]
    },
    gender: {
        type: [String],
        required: true,
        enum: ["Hombre", "Mujer", "Hombre Trans", "Mujer Trans", "No Binarie"]
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        required: true
    },
    photos: {
        type: [String]
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
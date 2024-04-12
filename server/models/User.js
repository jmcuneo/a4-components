const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    githubId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    githubUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('userdata', UserSchema, 'userdata')
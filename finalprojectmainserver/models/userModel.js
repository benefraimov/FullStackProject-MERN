const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('users', UserSchema)
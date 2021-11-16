const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    City: String
})

module.exports = mongoose.model('members', MemberSchema)
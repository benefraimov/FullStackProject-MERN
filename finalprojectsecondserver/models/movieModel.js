const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    Name: String,
    Genres: [String],
    Image: String,
    Premiered: Date
})

module.exports = mongoose.model('movies', MovieSchema)
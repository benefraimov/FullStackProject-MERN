const mongoose = require('mongoose')

const SubscriptionSchema = new mongoose.Schema({
    MemberId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'members'
    },
    Movies: [{
        movieId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'movies',
            required: true,
        }, date: Date
    }]
}, {
    timestamps: true,
})

module.exports = mongoose.model('subscriptions', SubscriptionSchema)
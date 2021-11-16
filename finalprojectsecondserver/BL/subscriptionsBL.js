const SubscriptionModel = require('../models/subscriptionModel')
const mongoose = require('mongoose')

const findMembersInSubscriptions = function (memberId) {
    return new Promise((resolve, reject) => {
        SubscriptionModel.find({ MemberId: memberId }, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.getSubscriptions = async function () {
    return new Promise((resolve, reject) => {
        SubscriptionModel.find({}, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.getSubscriptionById = async function (memberId) {
    return new Promise((resolve, reject) => {
        SubscriptionModel.find({ MemberId: memberId }, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.postAndUpdateSubscription = async function (memberId, bodyObject) {
    try {
        const member = await findMembersInSubscriptions(mongoose.Types.ObjectId(memberId))
        if (member.length > 0) {
            const movieId = bodyObject.movieId
            console.log(movieId)
            const allMovies = member[0].Movies
            const movie = allMovies.find(movie => movie.movieId.toString() === movieId)
            if (movie) {
                console.log("Member has already subscribed to that movie.")
            } else {
                const date = bodyObject.subscribedDate
                const movieId = mongoose.Types.ObjectId(bodyObject.movieId)
                const obj = {
                    MemberId: memberId,
                    Movies: [...allMovies, { movieId, date }]
                }
                SubscriptionModel.findByIdAndUpdate(member[0]._id, obj, (err) => {
                    if (err)
                        console.log(err)
                    else
                        console.log("Member subscribed to a new movie, congrats!")
                })
            }
        } else {
            const date = bodyObject.subscribedDate
            const movieId = mongoose.Types.ObjectId(bodyObject.movieId)
            const obj = new SubscriptionModel({
                MemberId: memberId,
                Movies: [{ movieId, date }]
            })
            obj.save(function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Member subscribed for the first time, congrats!", data)
                }
            })
        }
    } catch (err) {
        console.error(err)
    }
}

exports.deleteSubscriptionsByMemberId = async function (memberId) {
    return new Promise((resolve, reject) => {
        SubscriptionModel.findOneAndDelete({ MemberId: memberId }, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.deleteAndUpdateSubscriptionMoviesById = async function (id) {
    const allSubs = await this.getSubscriptions()

    for (let i = 0; i < allSubs.length; i++) {
        for (let j = 0; j < allSubs[i].Movies.length; j++) {

            const filteredMovies = allSubs[i].Movies.filter(movie => movie.movieId.toString() !== id)

            const obj = {
                MemberId: allSubs[i].MemberId,
                Movies: [...filteredMovies]
            }
            SubscriptionModel.findByIdAndUpdate(allSubs[i]._id, obj, (err) => {
                if (err)
                    console.log(err)
                else
                    console.log("Member Movies Updated!")
            })
        }
    }
}

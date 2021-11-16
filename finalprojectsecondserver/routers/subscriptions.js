const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Information import
const subscriptionsBL = require('../BL/subscriptionsBL')

router.route('/')
    .get(async function (req, resp) {
        let subscriptions = await subscriptionsBL.getSubscriptions()
        return resp.json(subscriptions)
    })

router.route('/:id')
    .get(async function (req, resp) {
        const memberId = mongoose.Types.ObjectId(req.params.id);
        let subscription = await subscriptionsBL.getSubscriptionById(memberId)
        return resp.json(subscription)
    })

router.route('/:id')
    .post(async function (req, resp) {
        let memberId = mongoose.Types.ObjectId(req.params.id);
        let bodyRequest = req.body;
        const res = await subscriptionsBL.postAndUpdateSubscription(memberId, bodyRequest)
        return resp.json(res)
    })

router.route('/:id')
    .delete(async function (req, resp) {
        let memberId = req.params.id
        const res = await subscriptionsBL.deleteSubscriptionsByMemberId(memberId)
        return resp.json(res)
    })

router.route('/:id')
    .put(async function (req, resp) {
        let movieId = req.params.id
        const res = await subscriptionsBL.deleteAndUpdateSubscriptionMoviesById(movieId)
        return resp.json(res)
    })


module.exports = router
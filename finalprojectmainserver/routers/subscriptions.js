const express = require('express')
const router = express.Router()
const axios = require('axios')

router.route('/')
    .get(async function (req, res) {
        const subscriptions = await axios.get('http://localhost:8000/api/subscriptions')
        return res.json(subscriptions.data)
    })

router.route('/:id')
    .get(async function (req, res) {
        const subscriptionId = req.params.id
        const subscriptions = await axios.get('http://localhost:8000/api/subscriptions/' + subscriptionId)
        return res.json(subscriptions.data)
    })

router.route('/:memberId')
    .post(async function (req, res) {
        const memberId = req.params.memberId
        const subscriptionsObj = req.body
        const subscriptions = await axios.post('http://localhost:8000/api/subscriptions/' + memberId, subscriptionsObj)
        return res.json(subscriptions.data)
    })

router.route('/:memberId')
    .delete(async function (req, resp) {
        const memberId = req.params.memberId
        const subscriptions = await axios.delete('http://localhost:8000/api/subscriptions/' + memberId)
        return resp.json(subscriptions.data)
    })

router.route('/:movieId')
    .put(async function (req, resp) {
        let movieId = req.params.movieId
        const subscriptions = await axios.put('http://localhost:8000/api/subscriptions/' + movieId)
        return resp.json(subscriptions.data)
    })

module.exports = router
const express = require('express')
const router = express.Router()
const axios = require('axios')

router.route('/')
    .get(async function (req, res) {
        const members = await axios.get('http://localhost:8000/api/members')
        return res.json(members.data)
    })

router.route('/:id')
    .get(async function (req, res) {
        const memberId = req.params.id
        const member = await axios.get('http://localhost:8000/api/members/' + memberId)
        return res.json(member.data)
    })

router.route('/')
    .post(async function (req, res) {
        const memberObj = req.body
        const member = await axios.post('http://localhost:8000/api/members', memberObj)
        return res.json(member.data)
    })

router.route('/:id')
    .put(async function (req, res) {
        const memberId = req.params.id
        const memberObj = req.body
        const member = await axios.put('http://localhost:8000/api/members/' + memberId, memberObj)
        return res.json(member.data)
    })

router.route('/:id')
    .delete(async function (req, res) {
        const memberId = req.params.id
        const member = await axios.delete('http://localhost:8000/api/members/' + memberId)
        return res.json(member.data)
    })

module.exports = router
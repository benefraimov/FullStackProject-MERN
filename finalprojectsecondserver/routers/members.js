const express = require('express')
const router = express.Router()

// Information import
const membersBL = require('../BL/membersBL')

router.route('/')
    .get(async function (req, resp) {
        let members = await membersBL.getMembers()
        return resp.json(members)
    })

router.route('/:id')
    .get(async function (req, resp) {
        const memberId = req.params.id
        let members = await membersBL.getMemberById(memberId)
        return resp.json(members)
    })

router.route('/')
    .post(async function (req, resp) {
        const memberObj = req.body
        let members = await membersBL.postMember(memberObj)
        return resp.json(members)
    })

router.route('/:id')
    .delete(async function (req, resp) {
        const memberId = req.params.id
        let members = await membersBL.deleteMemberById(memberId)
        return resp.json(members)
    })

router.route('/:id')
    .put(async function (req, resp) {
        const memberId = req.params.id
        const memberObj = req.body
        let members = await membersBL.updateMemberById(memberId, memberObj)
        return resp.json(members)
    })

module.exports = router
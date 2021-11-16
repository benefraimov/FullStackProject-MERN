const express = require('express')
const router = express.Router()

// importing User BL module
const usersBL = require('../BL/usersBL')

router.route('/')
    .get(async function (req, res) {
        const userMongo = await usersBL.getAllUsers()
        const userJson = await usersBL.getUsersJson()
        const permissionsJson = await usersBL.getPermissionsJson()
        let allUsersArr = []
        userMongo.forEach(userM => {
            userJson.forEach(userJ => {
                permissionsJson.forEach(permiJ => {
                    if (userM._id.toString() === userJ.userId && userM._id.toString() === permiJ.userId) {
                        let obj = {
                            _id: userM._id,
                            firstName: userJ.firstName,
                            lastName: userJ.lastName,
                            SessionTimeOut: userJ.SessionTimeOut,
                            Username: userM.Username,
                            Password: userM.Password,
                            createdAt: userM.createdAt,
                            updatedAt: userM.updatedAt,
                            Permissions: permiJ.Permissions
                        }
                        allUsersArr.push(obj)
                    }
                })
            })
        })
        return res.json(allUsersArr)
    })

router.route('/getbyname/:name')
    .get(async function (req, res) {
        const userName = req.params.name
        const userMongo = await usersBL.getUserByName(userName)
        if (userMongo.length > 0) {
            const obj = {
                _id: userMongo[0]._id,
                Username: userMongo[0].Username,
                Password: userMongo[0].Password,
                createdAt: userMongo[0].createdAt,
                updatedAt: userMongo[0].updatedAt
            }
            return res.json(obj)
        } else {
            return res.json("Not Found User By Username..")
        }
    })

router.route('/:id')
    .get(async function (req, res) {
        const userId = req.params.id
        const userMongo = await usersBL.getUserById(userId)
        if (userMongo.length > 0) {
            const userJson = await usersBL.getUserByIdFromJson(userId)
            const permissionsJson = await usersBL.getPermissionsByIdFromJson(userId)
            const allPermissions = permissionsJson.Permissions
            const obj = {
                _id: userMongo[0]._id,
                firstName: userJson.firstName,
                lastName: userJson.lastName,
                SessionTimeOut: userJson.SessionTimeOut,
                Username: userMongo[0].Username,
                Password: userMongo[0].Password,
                createdAt: userMongo[0].createdAt,
                updatedAt: userMongo[0].updatedAt,
                permissions: allPermissions
            }
            return res.json(obj)
        }
        else {
            return res.json(obj)
        }
    })

router.route('/')
    .post(async function (req, res) {
        const { firstName, lastName, Username, Password, Permissions, SessionTimeOut } = req.body
        const user = await usersBL.postNewUser({ Username, Password })
        let userId = user._id
        await usersBL.postToUsersJson({ userId, firstName, lastName, SessionTimeOut })
        await usersBL.postToPermissionsJson({ userId, Permissions })
        return res.json(user)
    })

router.route('/login')
    .post(async function (req, res) {
        const { Username, Password } = req.body
        const userMongo = await usersBL.loginUser({ Username, Password })
        if (userMongo.length > 0) {
            const userId = userMongo[0]._id.toString()
            const userJson = await usersBL.getUserByIdFromJson(userId)
            const permissionsJson = await usersBL.getPermissionsByIdFromJson(userId)
            const allPermissions = permissionsJson.Permissions
            const obj = {
                _id: userMongo[0]._id,
                firstName: userJson.firstName,
                lastName: userJson.lastName,
                SessionTimeOut: userJson.SessionTimeOut,
                Username: userMongo[0].Username,
                Password: userMongo[0].Password,
                createdAt: userMongo[0].createdAt,
                updatedAt: userMongo[0].updatedAt,
                Permissions: allPermissions
            }
            return res.json(obj)
        }
        return res.json(null)
    })


router.route('/:id')
    .put(async function (req, res) {
        const userId = req.params.id
        const { firstName, lastName, Username, Password, permissions, SessionTimeOut } = req.body
        const user = await usersBL.updateUserById(userId, { Username, Password })
        await usersBL.updateUsersJson({ userId, firstName, lastName, SessionTimeOut })
        await usersBL.updatePermissionsJson({ userId, permissions })
        return res.json(user)
    })

router.route('/:id')
    .delete(async function (req, res) {
        const userId = req.params.id
        const user = await usersBL.deleteUserById(userId)
        await usersBL.deleteUserFromJson({ userId })
        await usersBL.deletePermissionsFromJson({ userId })
        return res.json(user)
    })

module.exports = router
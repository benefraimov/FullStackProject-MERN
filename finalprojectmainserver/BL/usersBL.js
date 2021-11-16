const UserModel = require('../models/userModel')
const jsonFile = require('jsonfile')
// Include path module
var path = require("path");

exports.getAllUsers = function () {
    return new Promise((resolve, reject) => {
        UserModel.find({}, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.getUserById = function (id) {
    return new Promise((resolve, reject) => {
        UserModel.find({ _id: id }, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.getUserByName = function (name) {
    return new Promise((resolve, reject) => {
        UserModel.find({ Username: name }, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.loginUser = function (obj) {
    return new Promise((resolve, reject) => {
        UserModel.find({ Username: obj.Username, Password: obj.Password }, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.postNewUser = function (obj) {
    return new Promise((resolve, reject) => {
        UserModel.create(obj, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.deleteUserById = function (id) {
    return new Promise((resolve, reject) => {
        UserModel.findByIdAndDelete(id, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.updateUserById = function (id, obj) {
    return new Promise((resolve, reject) => {
        UserModel.findByIdAndUpdate(id, obj, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

// JSON FILES BL ----------------------------------------------------------------------------------------------------

// USERS JSONS BL ----------------------------------------------

// TOOL Function{
const readFile = (file) => {
    return new Promise((resolve, reject) => {
        jsonFile.readFile(process.cwd() + file, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
//}

exports.getUsersJson = async function () {
    let usersArr = []
    const fileBefore = await readFile('/Json Files/users.json')
    fileBefore.forEach(oldObj => usersArr.push(oldObj))
    return usersArr
}

exports.getUserByIdFromJson = async function (userId) {
    const fileBefore = await readFile('/Json Files/users.json')
    const userObj = fileBefore.find(obj => obj.userId === userId)
    return userObj
}

exports.postToUsersJson = async function (obj) {
    let usersArr = []
    const fileBefore = await readFile('/Json Files/users.json')
    fileBefore.forEach(oldObj => usersArr.push(oldObj))
    usersArr.push(obj)
    return new Promise((resolve, reject) => {
        jsonFile.writeFile(process.cwd() + '/Json Files/users.json', usersArr, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.updateUsersJson = async function (obj) {
    let usersArr = []
    const fileBefore = await readFile('/Json Files/users.json')
    fileBefore.forEach(oldObj => {
        if (oldObj.userId === obj.userId) {
            usersArr.push(obj)
        } else {
            usersArr.push(oldObj)
        }
    })
    return new Promise((resolve, reject) => {
        jsonFile.writeFile(process.cwd() + '/Json Files/users.json', usersArr, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.deleteUserFromJson = async function (obj) {
    let usersArr = []
    const fileBefore = await readFile('/Json Files/users.json')
    fileBefore.forEach(oldObj => {
        if (oldObj.userId !== obj.userId) {
            usersArr.push(oldObj)
        }
    })
    return new Promise((resolve, reject) => {
        jsonFile.writeFile(process.cwd() + '/Json Files/users.json', usersArr, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

// PERMISSIONS JSONS BL ----------------------------------------------


// GET All Permissions
exports.getPermissionsJson = async function () {
    let permissionsArr = []
    const fileBefore = await readFile('/Json Files/permissions.json')
    fileBefore.forEach(oldObj => permissionsArr.push(oldObj))
    return permissionsArr
}

// GET Permissions By Id
exports.getPermissionsByIdFromJson = async function (userId) {
    const fileBefore = await readFile('/Json Files/permissions.json')
    const permissionsObj = fileBefore.find(obj => obj.userId === userId)
    return permissionsObj
}


// POST A New Permissions Object
exports.postToPermissionsJson = async function (obj) {
    let permissionsArr = []
    const fileBefore = await readFile('/Json Files/permissions.json')
    fileBefore.forEach(oldObj => permissionsArr.push(oldObj))
    permissionObj = {
        userId: obj.userId,
        Permissions: obj.Permissions,
        SessionTimeOut: obj.SessionTimeOut,
    }
    permissionsArr.push(permissionObj)
    return new Promise((resolve, reject) => {
        jsonFile.writeFile(process.cwd() + '/Json Files/permissions.json', permissionsArr, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

// UPDATE Permissions By Id
exports.updatePermissionsJson = async function (obj) {
    let permissionsArr = []
    const fileBefore = await readFile('/Json Files/permissions.json')
    fileBefore.forEach(oldObj => {
        if (oldObj.userId === obj.userId) {
            permissionObj = {
                userId: obj.userId,
                Permissions: obj.permissions
            }
            permissionsArr.push(permissionObj)
        } else {
            permissionsArr.push(oldObj)
        }
    })
    return new Promise((resolve, reject) => {
        jsonFile.writeFile(process.cwd() + '/Json Files/permissions.json', permissionsArr, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

// DELETE Permissions By Id
exports.deletePermissionsFromJson = async function (obj) {
    let permissionsArr = []
    const fileBefore = await readFile('/Json Files/permissions.json')
    fileBefore.forEach(oldObj => {
        if (oldObj.userId !== obj.userId) {
            permissionsArr.push(oldObj)
        }
    })
    return new Promise((resolve, reject) => {
        jsonFile.writeFile(process.cwd() + '/Json Files/permissions.json', permissionsArr, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

// // Methods to display directory
// console.log("__dirname:    ", __dirname);
// console.log("process.cwd() : ", process.cwd());
// console.log("./ : ", path.resolve("./"));
// console.log("filename: ", __filename);
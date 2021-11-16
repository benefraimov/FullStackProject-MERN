const membersDal = require('../Dals/membersDal')
const MemberModel = require('../models/memberModel')

const findMembersInMongo = function () {
    return new Promise((resolve, reject) => {
        MemberModel.find({}, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

const createMemberInMongo = function (membersArr) {
    return new Promise((resolve, reject) => {
        membersArr.forEach(async (user) => {
            let member = new MemberModel({
                Name: user.name,
                Email: user.email,
                City: user.address.city
            })
            member.save(function (err, data) {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    })
}

exports.getMembers = async function () {
    let resp = await findMembersInMongo()
    if (resp.length > 0) {
        return resp
    } else {
        const members = await membersDal.membersDal()
        let membersArr = members.data.filter(member => member.id < 20)
        await createMemberInMongo(membersArr)
        resp = await findMembersInMongo()
        return resp
    }
}

exports.getMemberById = async function (memberId) {
    return new Promise((resolve, reject) => {
        MemberModel.find({ _id: memberId }, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.postMember = async function (obj) {
    return new Promise((resolve, reject) => {
        MemberModel.create(obj, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.deleteMemberById = async function (memberId) {
    return new Promise((resolve, reject) => {
        MemberModel.findByIdAndDelete({ _id: memberId }, async function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.updateMemberById = async function (memberId, obj) {
    return new Promise((resolve, reject) => {
        MemberModel.findByIdAndUpdate({ _id: memberId }, obj, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
import {
    getMembers,
    getMember,
    postMember,
    updateMember,
    deleteMember
} from '../DAL/members'

const getAllMembers = async () => {
    const { data: res } = await getMembers()
    return res
}

const getMemberById = async (id) => {
    const { data: res } = await getMember(id)
    return res
}

const postNewMember = async (obj) => {
    const { data: res } = await postMember(obj)
    return res
}

const updateExistingMember = async (id, obj) => {
    const { data: res } = await updateMember(id, obj)
    return res
}

const deleteExistingMember = async (id) => {
    const { data: res } = await deleteMember(id)
    return res
}

export {
    getAllMembers,
    getMemberById,
    postNewMember,
    updateExistingMember,
    deleteExistingMember
}
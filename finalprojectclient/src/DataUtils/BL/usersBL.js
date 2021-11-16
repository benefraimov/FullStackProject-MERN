import { getUsers, getUser, postUser, updateUser, deleteUser, getUserByName, loginUser } from '../DAL/users'

const getAllUsers = async () => {
    const { data: res } = await getUsers()
    return res
}

const getUserById = async (id) => {
    const { data: res } = await getUser(id)
    return res
}

const getUserByUsername = async (name) => {
    const { data: res } = await getUserByName(name)
    return res
}

const loginExistingUser = async (obj) => {
    const { data: res } = await loginUser(obj)
    return res
}

const postNewUser = async (obj) => {
    const { data: res } = await postUser(obj)
    return res
}

const updateExistingUser = async (id, obj) => {
    const { data: res } = await updateUser(id, obj)
    return res
}

const deleteExistingUser = async (id) => {
    const { data: res } = await deleteUser(id)
    return res
}

export {
    getAllUsers,
    getUserById,
    postNewUser,
    updateExistingUser,
    deleteExistingUser,
    getUserByUsername,
    loginExistingUser
}
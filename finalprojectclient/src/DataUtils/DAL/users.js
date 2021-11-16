import axios from 'axios'

const getUsers = () => {
    return axios.get('http://localhost:8001/api/users')
}

const getUser = (id) => {
    return axios.get('http://localhost:8001/api/users/' + id)
}

const getUserByName = (name) => {
    return axios.get('http://localhost:8001/api/users/getbyname/' + name)
}

const loginUser = (obj) => {
    return axios.post('http://localhost:8001/api/users/login', obj)
}

const postUser = (obj) => {
    return axios.post('http://localhost:8001/api/users', obj)
}

const updateUser = (id, obj) => {
    return axios.put('http://localhost:8001/api/users/' + id, obj)
}

const deleteUser = (id) => {
    return axios.delete('http://localhost:8001/api/users/' + id)
}

export {
    getUsers,
    getUser,
    postUser,
    updateUser,
    deleteUser,
    getUserByName,
    loginUser
}
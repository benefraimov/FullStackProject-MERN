import axios from 'axios'

const getMembers = () => {
    return axios.get('http://localhost:8001/api/members')
}

const getMember = (id) => {
    return axios.get('http://localhost:8001/api/members/' + id)
}

const postMember = (obj) => {
    return axios.post('http://localhost:8001/api/members', obj)
}

const updateMember = (id, obj) => {
    return axios.put('http://localhost:8001/api/members/' + id, obj)
}

const deleteMember = (id) => {
    return axios.delete('http://localhost:8001/api/members/' + id)
}

export {
    getMembers,
    getMember,
    postMember,
    updateMember,
    deleteMember
}
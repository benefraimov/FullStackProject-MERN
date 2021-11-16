const axios = require('axios')

exports.membersDal = function () {
    return axios.get('https://jsonplaceholder.typicode.com/users')
}


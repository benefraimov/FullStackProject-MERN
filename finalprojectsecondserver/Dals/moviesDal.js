const axios = require('axios')

exports.moviesDal = () => {
    return axios.get('https://api.tvmaze.com/shows')
}

// module.exports = { moviesDal }
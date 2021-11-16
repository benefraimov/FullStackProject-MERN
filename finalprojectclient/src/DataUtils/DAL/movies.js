import axios from 'axios'

const getMovies = () => {
    return axios.get('http://localhost:8001/api/movies')
}

const getMovie = (id) => {
    return axios.get('http://localhost:8001/api/movies/' + id)
}

const postMovie = (obj) => {
    return axios.post('http://localhost:8001/api/movies', obj)
}

const updateMovie = (id, obj) => {
    return axios.put('http://localhost:8001/api/movies/' + id, obj)
}

const deleteMovie = (id) => {
    return axios.delete('http://localhost:8001/api/movies/' + id)
}

export {
    getMovies,
    getMovie,
    postMovie,
    updateMovie,
    deleteMovie
}
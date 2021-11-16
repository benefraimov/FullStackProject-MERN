import { getMovies, getMovie, postMovie, updateMovie, deleteMovie } from '../DAL/movies'

const getAllMovies = async () => {
    const res = (await getMovies()).data
    return res
}

const getMovieById = async (id) => {
    const res = (await getMovie(id)).data
    return res
}

const postNewMovie = async (obj) => {
    const res = (await postMovie(obj)).data
    return res
}

const updateExistingMovie = async (id, obj) => {
    const res = (await updateMovie(id, obj)).data
    return res
}

const deleteMovieById = async (id) => {
    const res = (await deleteMovie(id)).data
    return res
}

export {
    getAllMovies,
    getMovieById,
    postNewMovie,
    updateExistingMovie,
    deleteMovieById
}
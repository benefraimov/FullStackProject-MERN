const moviesDal = require('../Dals/moviesDal')
const MovieModel = require('../models/movieModel')

const findMoviesInMongo = function () {
    return new Promise((resolve, reject) => {
        MovieModel.find({}, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

const createMovieInMongo = function (moviesArr) {
    return new Promise((resolve, reject) => {
        moviesArr.forEach(async (movie) => {
            let movieObj = new MovieModel({
                Name: movie.name,
                Genres: movie.genres,
                Image: movie.image.medium,
                Premiered: movie.premiered
            })
            movieObj.save(function (err, data) {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    })
}

exports.getMovies = async function () {
    let resp = await findMoviesInMongo()
    if (resp.length > 0) {
        return resp
    } else {
        const movies = await moviesDal.moviesDal()
        let moviesArr = movies.data.filter(movie => movie.id < 20)
        await createMovieInMongo(moviesArr)
        resp = await findMoviesInMongo()
        return resp
    }
}

exports.getMovieById = async function (movieId) {
    return new Promise((resolve, reject) => {
        MovieModel.findById(movieId, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.postMovie = async function (obj) {
    return new Promise((resolve, reject) => {
        MovieModel.create(obj, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.updateMovieById = async function (movieId, obj) {
    return new Promise((resolve, reject) => {
        MovieModel.findByIdAndUpdate(movieId, obj, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.deleteMovieById = async function (movieId) {
    return new Promise((resolve, reject) => {
        MovieModel.findByIdAndDelete(movieId, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
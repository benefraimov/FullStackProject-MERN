const express = require('express')
const router = express.Router()

// Information import
const moviesBL = require('../BL/moviesBL')

router.route('/')
    .get(async function (req, resp) {
        let movies = await moviesBL.getMovies()
        return resp.json(movies)
    })

router.route('/:id')
    .get(async function (req, resp) {
        let movieId = req.params.id
        let movie = await moviesBL.getMovieById(movieId)
        return resp.json(movie)
    })

router.route('/')
    .post(async function (req, resp) {
        let movieObj = req.body
        let movie = await moviesBL.postMovie(movieObj)
        return resp.json(movie)
    })

router.route('/:id')
    .put(async function (req, resp) {
        let movieId = req.params.id
        let movieObj = req.body
        let movie = await moviesBL.updateMovieById(movieId, movieObj)
        return resp.json(movie)
    })

router.route('/:id')
    .delete(async function (req, resp) {
        let movieId = req.params.id
        let movie = await moviesBL.deleteMovieById(movieId)
        return resp.json(movie)
    })

module.exports = router
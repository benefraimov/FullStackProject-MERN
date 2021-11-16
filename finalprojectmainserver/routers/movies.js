const express = require('express')
const router = express.Router()
const axios = require('axios')

router.route('/')
    .get(async function (req, res) {
        const movies = await axios.get('http://localhost:8000/api/movies')
        return res.json(movies.data)
    })

router.route('/:id')
    .get(async function (req, res) {
        const movieId = req.params.id
        const movie = await axios.get('http://localhost:8000/api/movies/' + movieId)
        return res.json(movie.data)
    })

router.route('/')
    .post(async function (req, res) {
        const movieObj = req.body
        const movie = await axios.post('http://localhost:8000/api/movies', movieObj)
        return res.json(movie.data)
    })

router.route('/:id')
    .put(async function (req, res) {
        const movieId = req.params.id
        const movieObj = req.body
        const movie = await axios.put('http://localhost:8000/api/movies/' + movieId, movieObj)
        return res.json(movie.data)
    })

router.route('/:id')
    .delete(async function (req, res) {
        const movieId = req.params.id
        const movie = await axios.delete('http://localhost:8000/api/movies/' + movieId)
        return res.json(movie.data)
    })

module.exports = router
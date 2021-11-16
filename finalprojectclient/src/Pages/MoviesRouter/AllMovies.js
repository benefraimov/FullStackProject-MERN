import React, { useEffect, useState } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import Movie from '../../Compoenents/Movie'
import { getAllMovies, deleteMovieById } from '../../DataUtils/BL/moviesBL'
import { deleteMovieFromSubscribersByMovieId } from '../../DataUtils/BL/subscriptionsBL'

const AllMovies = () => {
    const [movies, setMovies] = useState([])
    const [find, setFind] = useState("")
    const [moviesFound, setMoviesFound] = useState([])
    const [flag, setFlag] = useState(false)

    let { url } = useRouteMatch()
    const history = useHistory()

    useEffect(() => {
        const fetchMovies = async () => {
            let res = await getAllMovies()
            setMovies(res)
        }
        fetchMovies()
    }, [flag])

    const deleteMovie = async (movieId) => {
        const res1 = await deleteMovieById(movieId)
        const res2 = await deleteMovieFromSubscribersByMovieId(movieId)
        setFlag(!flag)
        console.log(res1, res2)
    }

    const findMovies = () => {
        let checkMovies = movies.filter(movie => movie.Name.includes(find))
        setMoviesFound(checkMovies)
    }

    const moveToMovie = (movieId) => {
        history.push(url + '/movie/' + movieId)
    }

    const moviesRepeater = movies.map(movie => {
        return <Movie key={movie._id} movie={movie} link={url} callback={deleteMovie} goToMoviePage={moveToMovie} />
    })

    const moviesRepeaterWithFind = moviesFound.map(movie => {
        return <Movie key={movie._id} movie={movie} link={url} callback={deleteMovie} goToMoviePage={moveToMovie} />
    })

    return (
        <div className={'allMovies'}>
            <label>Find Movie: </label>
            <input type="text" value={find} onChange={(e) => setFind(e.target.value)} />
            <input type="button" value="Find" onClick={findMovies} /><br /><br /><br />
            {moviesFound.length > 0 ? moviesRepeaterWithFind : moviesRepeater}
        </div>
    )
}

export default AllMovies

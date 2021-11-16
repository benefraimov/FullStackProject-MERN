import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieById } from '../../DataUtils/BL/moviesBL'
import SubscriptionsWatched from '../../Compoenents/SubscriptionsWatched'

const MoviePage = () => {
    const [movie, setMovie] = useState()

    let { id } = useParams()
    console.log(id)

    useEffect(() => {
        async function getMovie(movieId) {
            const res = await getMovieById(movieId)
            setMovie(res)
        }
        getMovie(id)
    }, [])
    return (
        <div className={'movie'} style={{
            margin: "80px auto 75px",
            width: "50%",
            border: "3px solid green",
            padding: "10px"
        }}>
            {movie ?
                <>
                    <h2>{movie.Name}, {movie.Premiered.slice(0, 4)}</h2>
                    <h3>Genres: {movie.Genres[0]}, {movie.Genres[1]}, {movie.Genres[2]}</h3> <br />
                    <div className={'membersWatched'}>
                        <div><img style={{ height: "182px" }} src={movie.Image} alt="No Conn" /></div>
                        <div style={{ width: "350px", marginTop: "-20px" }} ><SubscriptionsWatched movie={movie} /></div>
                    </div>
                </>
                : ''}
        </div>
    )
}

export default MoviePage

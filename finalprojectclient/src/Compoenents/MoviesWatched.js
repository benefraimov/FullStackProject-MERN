import React, { useEffect, useState } from 'react'
import SubscribeMovie from './SubscribeMovie'
import { getExistingSubscriberById } from '../DataUtils/BL/subscriptionsBL'
import { getMovieById } from '../DataUtils/BL/moviesBL'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const MoviesWatched = (props) => {
    const [subscriberMovies, setSubscriberMovies] = useState([])
    const [subscribeDialog, setSubscribeDialog] = useState(false)
    const [userPermissions, setUserPermissions] = useState([])
    const [flag, setFlag] = useState(false)

    const userLogin = useSelector(state => state.login.userLogin)
    const userDetails = useSelector(state => state.login.userDetails)

    useEffect(() => {
        async function getSubscriber(id) {
            const subscriber = await getExistingSubscriberById(id)
            if (subscriber.length > 0) {
                if (subscriber[0].Movies.length > 0) {
                    subscriber[0].Movies.forEach(async (movie) => {
                        const movieFound = await getMovieById(movie.movieId)
                        if (movieFound._id === movie.movieId) {
                            setSubscriberMovies(state => [...state, movieFound])
                        }
                    })
                }
            }
        }
        getSubscriber(props.member._id)
        return () => {
            setSubscriberMovies([]); // Clean Up
        };
    }, [flag])

    useEffect(() => {
        if (userLogin === "USER") {
            setUserPermissions(userDetails.Permissions)
        }
        if (userLogin === "ADMIN") {
            setUserPermissions(userDetails.Permissions)
        }
    }, [])

    const watchedMoviesList = subscriberMovies.map(movie => {
        return <li key={movie._id}><Link to={`/secondrouter/movies/movie/${movie._id}`}>{movie.Name}</Link>, {movie.Premiered.slice(0, 10)}</li>
    })

    const afterSubscribe = () => {
        setFlag(!flag)
        console.log("it came here..")
    }

    return (
        <div style={{ border: "2px black solid", marginBottom: "30px" }}>
            <h1>Movies Watched</h1>
            {
                userPermissions.some(e => e.createSubscriptions === true) ?
                    < button onClick={() => {
                        setFlag(!flag)
                        setSubscribeDialog(!subscribeDialog)
                    }
                    }>Subscribe to new movies</button>
                    : ''
            }
            {subscribeDialog ? <SubscribeMovie callback={afterSubscribe} memberId={props.member._id} /> : ''}
            <ul>{watchedMoviesList}</ul>
        </div >
    )
}

export default MoviesWatched

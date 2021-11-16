import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../DataUtils/BL/moviesBL'
import { updateExistingSubscription } from '../DataUtils/BL/subscriptionsBL'

const SubscribeMovie = (props) => {
    const [movies, setMovies] = useState([])
    const [date, setDate] = useState("")
    const [selectedMovie, setSelectedMovie] = useState({})

    useEffect(() => {
        async function getMovies() {
            const movies = await getAllMovies()
            setMovies(movies)
        }
        getMovies()
        return () => {
            setMovies([])
        }
    }, [])

    const optionRepeater = movies.map((movie) => {
        return <option key={movie._id} name="movie">{movie.Name}</option>
    })

    const subscribe = async () => {
        const movieid = selectedMovie._id
        let obj = {
            movieId: movieid,
            subscribedDate: date
        }
        console.log(obj)
        await updateExistingSubscription(props.memberId, obj)
        console.log("Subscribed!")
        props.callback()
    }

    const checkSelect = (e) => {
        const movieFound = movies.find(movie => movie.Name === e.target.value)
        setSelectedMovie(movieFound)
    }

    return (
        <div style={{ border: "2px red solid" }}>
            <h3>Add a new movie</h3>
            <form onSubmit={subscribe}>
                <select required onChange={checkSelect}>
                    <option></option>
                    {optionRepeater}
                </select>
                <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} /><br />
                <input type="submit" value="Subscribe" /><br />
            </form>
        </div>
    )
}

export default SubscribeMovie

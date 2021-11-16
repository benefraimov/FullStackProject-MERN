import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../Styles/style.css'
import SubscriptionsWatched from './SubscriptionsWatched'

const Movie = (props) => {

    const login = useSelector(state => state.login)
    const { userDetails } = login

    const deleteMovie = () => {
        props.callback(props.movie._id)
    }

    const openMoviePage = () => {
        props.goToMoviePage(props.movie._id)
    }

    return (
        <div className={'movie'}>
            <h2>{props.movie.Name}, {props.movie.Premiered.slice(0, 4)}</h2>
            <h3>Genres: {props.movie.Genres[0]}, {props.movie.Genres[1]}, {props.movie.Genres[2]}</h3> <br />
            <div className={'membersWatched'}>
                <div onClick={openMoviePage}><img style={{ height: "182px" }} src={props.movie.Image} alt="No Conn" /></div>
                <div style={{ width: "350px", marginTop: "-20px" }} ><SubscriptionsWatched movie={props.movie} /></div>
            </div>
            {
                userDetails.Permissions.some(e => e.updateMovies === true) ?
                    <Link to={props.link + '/editmovie/' + props.movie._id}><button>Edit</button></Link>
                    : ''
            }
            {
                userDetails.Permissions.some(e => e.deleteMovies === true) ?
                    <button onClick={deleteMovie}>Delete</button>
                    : ''
            }
        </div>
    )
}

export default Movie

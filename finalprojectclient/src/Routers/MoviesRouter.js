import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch, Link, useHistory } from 'react-router-dom'
import '../Styles/style.css'

// pages nav
import AllMovies from '../Pages/MoviesRouter/AllMovies'
import AddMovie from '../Pages/MoviesRouter/AddMovie'
import EditMovie from '../Pages/MoviesRouter/EditMovie'
import MoviePage from '../Pages/MoviesRouter/MoviePage'

const MoviesRouter = (props) => {
    const history = useHistory()
    let { path, url } = useRouteMatch()

    const login = useSelector(state => state.login)
    const { userDetails, userLogin } = login

    useEffect(() => {
        if (userLogin === "LOGOUT") {
            history.push('/')
        }
    }, [userLogin, props, history])


    return (
        <div>
            <div className={"moviesRouter"}>
                <div><Link className={'link'} to={url}>All Movies</Link></div>
                {
                    userDetails.Permissions.some(e => e.createMovies === true) ?
                        <div><Link className={'link'} to={url + '/addmovie'}>Add Movie</Link></div> : ''
                }
            </div>

            <Switch>
                <Route path={path} exact>
                    <AllMovies />
                </Route>
                <Route path={path + '/movie/:id'}>
                    <MoviePage />
                </Route>
                {
                    userDetails.Permissions.some(e => e.createMovies === true) ?
                        <Route path={path + '/addmovie'}>
                            <AddMovie />
                        </Route> : ''
                }
                {
                    userDetails.Permissions.some(e => e.updateMovies === true) ?
                        <Route path={path + '/editmovie/:id'}>
                            <EditMovie />
                        </Route> : ''
                }
            </Switch>
        </div>
    )
}

export default MoviesRouter

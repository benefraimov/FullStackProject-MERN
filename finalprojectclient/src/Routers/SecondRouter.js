import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch, Link, useHistory } from 'react-router-dom'
import '../Styles/style.css'

// pages nav
import Movies from '../Pages/SecondRouter/Movies'
import Subscriptions from '../Pages/SecondRouter/Subscriptions'
import UsersManagement from '../Pages/SecondRouter/UsersManagement'

const SecondRouter = (props) => {
    const [flagForAdmin, setFlagForAdmin] = useState(false)
    const [userPermissions, setUserPermissions] = useState([])

    let { path, url } = useRouteMatch()
    const history = useHistory()
    const dispatch = useDispatch()

    const login = useSelector(state => state.login)
    const { userDetails, userLogin } = login

    useEffect(() => {
        if (userLogin === "ADMIN") {
            setFlagForAdmin(true)
            setUserPermissions(userDetails.Permissions)
        }
        if (userLogin === "LOGOUT") {
            history.push('/')
        }
        if (userLogin === "USER") {
            setUserPermissions(userDetails.Permissions)
        }
    }, [dispatch, userLogin, history])

    const logOut = () => {
        dispatch({ type: "LOGOUT" })
    }
    return (
        <div>
            <div className={"secondRouter"}>
                {
                    userPermissions.some(e => e.viewMovies === true) ?
                        <div><Link className={'link'} to={url + '/movies'}>Movies</Link></div>
                        : ''
                }
                {
                    userPermissions.some(e => e.viewSubscriptions === true) ?
                        <div><Link className={'link'} to={url + '/subscription'}>Subscriptions</Link></div>
                        : ''
                }
                {
                    flagForAdmin ?
                        <div><Link className={'link'} to={url + '/usersmanagement'}>Users Management</Link></div> : ''
                }
                <div><Link onClick={logOut} className={'link'} to={url}>Log Out</Link></div>
            </div>

            <Switch>
                {
                    userPermissions.some(e => e.viewMovies === true) ?
                        <Route path={path + '/movies'}>
                            <Movies />
                        </Route> : ''
                }
                {
                    userPermissions.some(e => e.viewSubscriptions === true) ?
                        <Route path={path + '/subscription'}>
                            <Subscriptions />
                        </Route> : ''
                }
                {
                    flagForAdmin ?
                        <Route path={path + '/usersmanagement'}>
                            <UsersManagement />
                        </Route> : ''
                }
            </Switch>
        </div >
    )
}

export default SecondRouter

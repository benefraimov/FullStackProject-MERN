import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch, Link, useHistory } from 'react-router-dom'
import '../Styles/style.css'

// pages nav
import AllUsers from '../Pages/UsersManagementRouter/AllUsers'
import EditUser from '../Pages/UsersManagementRouter/EditUser'
import AddUser from '../Pages/UsersManagementRouter/AddUser'

const UsersManagementRouter = (props) => {
    const history = useHistory()

    let { path, url } = useRouteMatch()

    const userLogin = useSelector(state => state.login.userLogin)

    useEffect(() => {
        if (userLogin === "LOGOUT") {
            history.push('/')
        }
    }, [userLogin, props, history])


    return (
        <div>
            <h1>Users</h1>
            <div className={"moviesRouter"}>
                <div><Link className={'link'} to={url}>All Users</Link></div>
                <div><Link className={'link'} to={url + '/adduser'}>Add User</Link></div>
            </div>

            <Switch>
                <Route path={path} exact>
                    <AllUsers />
                </Route>
                <Route path={path + '/adduser'}>
                    <AddUser />
                </Route>
                <Route path={path + '/edituser/:id'}>
                    <EditUser />
                </Route>
            </Switch>
        </div >
    )
}

export default UsersManagementRouter
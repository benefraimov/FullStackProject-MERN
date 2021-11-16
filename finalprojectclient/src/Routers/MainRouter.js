import React, { useEffect, useState } from 'react'
import Login from '../Pages/MainRouter/Login'
import Register from '../Pages/MainRouter/Register'
import { Route, Switch, useHistory } from 'react-router-dom'
import SecondRouter from './SecondRouter'
import IdleTimerContainer from '../Compoenents/IdleTimerContainer'
import { useSelector } from 'react-redux'

const MainRouter = () => {
    const history = useHistory()

    const login = useSelector(state => state.login)
    const { userLogin, userDetails } = login

    useEffect(() => {
        if (userLogin !== "ADMIN" || userLogin !== "USER") {
            history.push('/')
        }
    }, [userLogin])

    return (
        <div>
            <h1>Movies - Subscription Web Site</h1>
            {
                userLogin === "USER" ?
                    <div>
                        {userDetails ?
                            <IdleTimerContainer timer={userDetails.SessionTimeOut * 60 * 1000} />
                            : ''}
                    </div>
                    : ''
            }
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/secondrouter' component={SecondRouter} />
            </Switch>
        </div>
    )
}

export default MainRouter

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
import '../Styles/style.css'

// pages nav
import AllMembers from '../Pages/SubscriptionRouter/AllMembers'
import EditMember from '../Pages/SubscriptionRouter/EditMember'
import AddMember from '../Pages/SubscriptionRouter/AddMember'

const SubscriptionRouter = (props) => {
    const [userPermissions, setUserPermissions] = useState([])

    let { path, url } = useRouteMatch()

    const userLogin = useSelector(state => state.login.userLogin)
    const userDetails = useSelector(state => state.login.userDetails)

    useEffect(() => {
        if (userLogin === "LOGOUT") {
            props.history.push('/')
        }
        if (userLogin === "USER") {
            setUserPermissions(userDetails.Permissions)
        }
        if (userLogin === "ADMIN") {
            setUserPermissions(userDetails.Permissions)
        }
    }, [userLogin, props, userDetails])


    return (
        <div>
            <div className={"moviesRouter"}>
                <div><Link className={'link'} to={url}>All Members</Link></div>
                {
                    userPermissions.some(e => e.createSubscriptions === true) ?
                        <div><Link className={'link'} to={url + '/addmember'}>Add Member</Link></div> : ''
                }
            </div>

            <Switch>
                {
                    userPermissions.some(e => e.viewSubscriptions === true) ?
                        <Route path={path} exact>
                            <AllMembers />
                        </Route> : ''
                }
                {
                    userPermissions.some(e => e.createSubscriptions === true) ?
                        <Route path={path + '/addmember'}>
                            <AddMember />
                        </Route> : ''
                }
                {
                    userPermissions.some(e => e.updateSubscriptions === true) ?
                        <Route path={path + '/editmember/:id'}>
                            <EditMember />
                        </Route> : ''
                }
            </Switch>
        </div>
    )
}

export default SubscriptionRouter

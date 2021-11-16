import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../Styles/style.css'
import MoviesWatched from './MoviesWatched'

const Member = (props) => {
    const [userPermissions, setUserPermissions] = useState([])

    const userLogin = useSelector(state => state.login.userLogin)
    const userDetails = useSelector(state => state.login.userDetails)

    useEffect(() => {
        if (userLogin === "USER") {
            setUserPermissions(userDetails.Permissions)
        }
        if (userLogin === "ADMIN") {
            setUserPermissions(userDetails.Permissions)
        }
    }, [])

    const deleteMember = () => {
        props.callback(props.member._id)
    }
    return (
        <div className={'user'}>
            <h2>{props.member.Name}</h2><br />
            Email: {props.member.Email} <br />
            City: {props.member.City} <br />
            {
                userPermissions.some(e => e.updateSubscriptions === true) ?
                    <Link to={props.link + '/' + props.member._id}><button>Edit</button></Link> : ''
            }
            {
                userPermissions.some(e => e.deleteSubscriptions === true) ?
                    <button onClick={deleteMember}>Delete</button> : ''
            }
            <MoviesWatched member={props.member} />
        </div>
    )
}

export default Member

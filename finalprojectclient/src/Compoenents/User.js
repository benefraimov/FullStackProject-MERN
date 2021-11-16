import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/style.css'

const User = (props) => {
    const [adminFlag, setAdminFlag] = useState(false)

    useEffect(() => {
        if (props.user.Username === "Admin")
            setAdminFlag(true)

    }, [])
    const deleteUser = () => {
        props.callback(props.user._id)
    }

    const permission = props.user.Permissions.map((per, index) => {
        if (Object.values(per)[0]) {
            return <li key={index}>{Object.keys(per)[0]}</li>
        }
    })
    return (
        <>
            {
                !adminFlag ?
                    <div className={'user'}>
                        < b > First Name: </b > {props.user.firstName} < br />
                        <b>Last Name: </b>{props.user.lastName}<br />
                        <b>User Name: </b> {props.user.Username} <br />
                        <b>Created Date: </b> {props.user.createdAt.slice(0, 10)} <br />
                        <b>Session time out(Minutes): </b> {props.user.SessionTimeOut ? props.user.SessionTimeOut.toString() : ''} <br />
                        <b>Permissions: </b> <ul>{permission}</ul>  <br /><br />
                        <Link to={props.link + '/' + props.user._id}><button>Edit</button></Link>
                        <button onClick={deleteUser}>Delete</button>
                    </div > : ''
            }
        </>
    )
}

export default User

import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import '../../Styles/style.css'
import { getAllUsers, deleteExistingUser } from '../../DataUtils/BL/usersBL'

import UserComp from '../../Compoenents/User'

const AllUsers = () => {
    const [flag, setFlag] = useState(false)
    const [repeater, setRepeater] = useState()
    let { url } = useRouteMatch()

    const deleteUser = async (userId) => {
        await deleteExistingUser(userId)
        setFlag(!flag)
    }

    useEffect(() => {
        async function getUsers() {
            const users = await getAllUsers()
            setRepeater(
                users.map(user => {
                    return <UserComp
                        key={user._id}
                        user={user}
                        callback={deleteUser}
                        link={url + '/edituser'}
                    />
                })
            )
        }
        getUsers()
    }, [url, flag])

    return (
        <div className={'allUsers'}>
            {repeater}
        </div>
    )
}

export default AllUsers

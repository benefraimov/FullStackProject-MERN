import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { updateExistingUser, getUserById } from '../../DataUtils/BL/usersBL'


const EditUser = () => {
    const [button, setButton] = useState(0)
    const [user, setUser] = useState({
        firstName: "", lastName: "", Username: "", Password: "", SessionTimeOut: "", permissions: [
            { viewSubscriptions: false }, { createSubscriptions: false }, { deleteSubscriptions: false }, { updateSubscriptions: false }, { viewMovies: false }, { createMovies: false }, { deleteMovies: false }, { updateMovies: false }]
    })

    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        let userId = id
        async function getUserData(id) {
            const resp = await getUserById(id)
            setUser(resp)
        }
        getUserData(userId)
    }, [id])

    const handleText = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const updateUser = async (e) => {
        e.preventDefault()
        if (button === 1) {
            setUser({ ...user, SessionTimeOut: user.SessionTimeOut.toString() })
            let ObjToUpdate = {
                firstName: user.firstName,
                lastName: user.lastName,
                SessionTimeOut: user.SessionTimeOut,
                Username: user.Username,
                Password: user.Password,
                permissions: user.permissions
            }
            await updateExistingUser(id, ObjToUpdate)
            history.goBack()
        }
        if (button === 2) {
            console.log("Cancel");
            // Go back
            history.goBack()
        }
    }

    return (
        <div>
            <h1>Edit User: User.Name</h1>

            <form onSubmit={updateUser}>
                <label>First Name: </label>
                <input type="text" name="firstName" value={user.firstName} onChange={handleText} /><br />
                <label>Last Name: </label>
                <input type="text" name="lastName" value={user.lastName} onChange={handleText} /><br />
                <label>User Name: </label>
                <input type="text" name="Username" value={user.Username} onChange={handleText} /><br />
                <label>Session timed out(Minutes): </label>
                <input type="number" name="SessionTimeOut" value={user.SessionTimeOut} onChange={handleText} /><br />
                <label>Password: </label>
                <input type="text" name="Password" value={user.Password} onChange={handleText} /><br />
                <label>Permissions: </label><br />
                <input type="checkbox" checked={user.permissions[0].viewSubscriptions}
                    onChange={() => {
                        let userForAll = user
                        userForAll.permissions[0].viewSubscriptions = !user.permissions[0].viewSubscriptions
                        setUser({ ...userForAll })
                    }} />
                <label> View Subscriptions</label><br />
                <input type="checkbox" checked={user.permissions[1].createSubscriptions}
                    onChange={() => {
                        let userForAll = user
                        userForAll.permissions[1].createSubscriptions = !user.permissions[1].createSubscriptions
                        if (user.permissions[1].createSubscriptions)
                            userForAll.permissions[0].viewSubscriptions = true
                        setUser({ ...userForAll })
                    }} />
                <label> Create Subscriptions</label><br />
                <input type="checkbox" checked={user.permissions[2].deleteSubscriptions}
                    onChange={() => {
                        let userForAll = user
                        userForAll.permissions[2].deleteSubscriptions = !user.permissions[2].deleteSubscriptions
                        if (user.permissions[2].deleteSubscriptions)
                            userForAll.permissions[0].viewSubscriptions = true
                        setUser({ ...userForAll })
                    }} />
                <label> Delete Subscriptions</label><br />
                <input type="checkbox" checked={user.permissions[3].updateSubscriptions}
                    onChange={() => {
                        let userForAll = user
                        userForAll.permissions[3].updateSubscriptions = !user.permissions[3].updateSubscriptions
                        if (user.permissions[3].updateSubscriptions)
                            userForAll.permissions[0].viewSubscriptions = true
                        setUser({ ...userForAll })
                    }} />
                <label> Update Subscriptions</label><br />
                <input type="checkbox" checked={user.permissions[4].viewMovies}
                    onChange={() => {
                        let userForAll = user
                        userForAll.permissions[4].viewMovies = !user.permissions[4].viewMovies
                        setUser({ ...userForAll })
                    }} />
                <label> View Movies</label><br />
                <input type="checkbox" checked={user.permissions[5].createMovies}
                    onChange={() => {
                        let userForAll = user
                        userForAll.permissions[5].createMovies = !user.permissions[5].createMovies
                        if (user.permissions[5].createMovies)
                            userForAll.permissions[4].viewMovies = true
                        setUser({ ...userForAll })
                    }} />
                <label> Create Movies</label><br />
                <input type="checkbox" checked={user.permissions[6].deleteMovies}
                    onChange={() => {
                        let userForAll = user
                        userForAll.permissions[6].deleteMovies = !user.permissions[6].deleteMovies
                        if (user.permissions[6].deleteMovies)
                            userForAll.permissions[4].viewMovies = true
                        setUser({ ...userForAll })
                    }} />
                <label> Delete Movies</label><br />
                <input type="checkbox" checked={user.permissions[7].updateMovies}
                    onChange={() => {
                        let userForAll = user
                        userForAll.permissions[7].updateMovies = !user.permissions[7].updateMovies
                        if (user.permissions[7].updateMovies)
                            userForAll.permissions[4].viewMovies = true
                        setUser({ ...userForAll })
                    }} />
                <label> Update Movies</label><br />
                <button
                    onClick={() => (setButton(1))}
                    type="submit"
                    name="save"
                >Save</button>
                <button
                    onClick={() => (setButton(2))}
                    type="submit"
                    name="cancel"
                >Cancel</button>
            </form>
        </div>
    )
}

export default EditUser
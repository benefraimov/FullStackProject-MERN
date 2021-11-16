import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getUserByUsername, getUserById, updateExistingUser } from '../../DataUtils/BL/usersBL'

const RegisterPage = () => {
    const [user, setUser] = useState({ Username: "", Password: "" })
    const [fields, setFields] = useState(true)
    const [exist, setExist] = useState(false)

    const dispatch = useDispatch()

    const history = useHistory()

    const registerUser = async (e) => {
        e.preventDefault()
        if (user.Username === "" || user.Password === "") {
            setFields(false)
            setExist(false)
        } else {
            const userMongo = await getUserByUsername(user.Username)
            if (userMongo) {
                if (userMongo.Password !== "") {
                    setExist(true)
                    setFields(true)
                }
                else {
                    const existingUser = await getUserById(userMongo._id)
                    let userObj = existingUser
                    userObj.Password = user.Password
                    const res = await updateExistingUser(userMongo._id, userObj)
                    if (res) {
                        console.log(res)
                        history.push('/')
                    } else {
                        console.log("Error In Updating User..")
                    }
                }
            }
        }
    }
    return (
        <div>
            <h1>Register Page</h1>
            <Link to='/'>Back To Login</Link><br /><br />
            {fields ? '' : 'Please fill all the fields in the form!'}
            {exist ? "You Already Set Your Password, Please Go To Login Page.." : ''}
            <form onSubmit={registerUser}>
                <label>Username: </label>
                <input type="text" required value={user.Username} placeholder="Write Your Username Here..." onChange={e => setUser({ ...user, Username: e.target.value })} /><br />
                <label>Password: </label>
                <input type="text" required value={user.Password} placeholder="Write Your Password Here..." onChange={e => setUser({ ...user, Password: e.target.value })} /><br /><br />
                <input type="submit" value="Set Password" />
            </form>
        </div>
    )
}

export default RegisterPage

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import '../../Styles/style.css'
import { loginExistingUser } from '../../DataUtils/BL/usersBL'

const LoginPage = (props) => {
    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")
    const [flag, setFlag] = useState(false)
    const [message] = useState("Username Or Password Are Wrong.")

    const history = useHistory()

    const dispatch = useDispatch()

    const login = useSelector(state => state.login)
    const { userLogin } = login


    useEffect(() => {
        setFlag(false)
        if (userLogin === "ADMIN" || userLogin === "USER") {
            history.push(`/secondrouter/movies`)
        }
    }, [dispatch, userLogin, history, message])

    const loginUser = async (e) => {
        e.preventDefault()
        async function fetchData() {
            const user = await loginExistingUser({ Username, Password })
            if (user) {
                setFlag(false)
                if (user.Username === "Admin") {
                    dispatch({ type: "LOGINASADMIN" })
                    dispatch({ type: "DETAILS", payload: user })
                    history.push(`/secondrouter/movies`)
                }
                else {
                    dispatch({ type: "LOGINASUSER" })
                    dispatch({ type: "DETAILS", payload: user })
                    history.push(`/secondrouter/movies`)
                }
            }
            else {
                setFlag(true)
            }
        }
        await fetchData()
    }

    return (
        <div>
            <h1>Login Page</h1>
            {flag ? message : ''}
            <form onSubmit={loginUser} className={'container'}>
                <input type="text" required value={Username} placeholder="Username here..." onChange={e => setUsername(e.target.value)} /><br />
                <input type="text" required value={Password} placeholder="Password here..." onChange={e => setPassword(e.target.value)} /><br /><br />
                <input type="submit" value="Login" />
            </form><br />
            <button className={"button button1"} onClick={() => props.history.push('/register')}>New User?</button><br />
        </div>
    )
}

export default LoginPage

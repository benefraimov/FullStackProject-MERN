const initialState = {
    userLogin: "",
    userDetails: {},
    userRegister: { email: "", name: "", password: "" }
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGINASUSER': {
            const userLogin = "USER"
            localStorage.setItem('userLogin', "USER")
            return { ...state, userLogin }
        }
        case 'LOGOUT': {
            const userLogin = "LOGOUT"
            localStorage.setItem('userLogin', "LOGOUT")
            localStorage.removeItem('userDetails');
            return { ...state, userLogin }
        }
        case 'LOGINASADMIN': {
            const userLogin = "ADMIN"
            localStorage.setItem('userLogin', "ADMIN")
            return { ...state, userLogin }
        }
        case "DETAILS": {
            localStorage.setItem('userDetails', JSON.stringify(action.payload))
            return { ...state, userDetails: action.payload }
        }
        default: return state
    }
}

export default loginReducer
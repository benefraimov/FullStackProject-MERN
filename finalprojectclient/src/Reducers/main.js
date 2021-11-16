import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk'

// Reducers Importing 

import login from './login'
// import register from './register'

const rootReducer = combineReducers({
    login: login,
})

const userDetailsFromStorage = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : null
const userLoginFromStorage = localStorage.getItem('userLogin') ? localStorage.getItem('userLogin') : null

const initialState = {
    login: {
        userDetails: userDetailsFromStorage,
        userLogin: userLoginFromStorage
    },
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk]

const store = createStore(rootReducer, initialState, composeEnhancer(applyMiddleware(...middleware)))

export default store

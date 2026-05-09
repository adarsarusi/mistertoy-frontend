import axios from 'axios'

const BASE_URL = 'http://localhost:3030/api'
const STORAGE_KEY_LOGGEDIN = 'user'

export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    getById,
    query,
    getEmptyCredentials,
}

function query() {
    return axios.get(BASE_URL + '/user')
        .then(res => res.data)
}

function getById(userId) {
    return axios.get(BASE_URL + '/user/' + userId)
        .then(res => res.data)
}

function login(credentials) {
    return axios.post(BASE_URL + '/auth/login', credentials)
        .then(res => _setLoggedinUser(res.data))
}

function signup(credentials) {
    return axios.post(BASE_URL + '/auth/signup', credentials)
        .then(res => _setLoggedinUser(res.data))
}

function logout() {
    return axios.post(BASE_URL + '/auth/logout')
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
        })
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
    }
}

function _setLoggedinUser(user) {
    const userToSave = {
        _id: user._id,
        fullname: user.fullname,
        balance: user.balance
    }

    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}
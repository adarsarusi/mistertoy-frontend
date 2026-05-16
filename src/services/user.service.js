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

async function query() {
    const res = await axios.get(BASE_URL + '/user')
    return res.data
}
// function query() {
//     return axios.get(BASE_URL + '/user')
//         .then(res => res.data)
// }

async function getById(userId) {
    const res = await axios.get(BASE_URL + '/user/' + userId)
    return res.data
}
// function getById(userId) {
//     return axios.get(BASE_URL + '/user/' + userId)
//         .then(res => res.data)
// }

async function login(credentials) {
    const res = await axios.post(BASE_URL + '/auth/login', credentials)
    return _setLoggedinUser(res.data)
}

// function login(credentials) {
//     return axios.post(BASE_URL + '/auth/login', credentials)
//         .then(res => _setLoggedinUser(res.data))
// }

async function signup(credentials) {
    const res = await axios.post(BASE_URL + '/auth/signup', credentials)
    return _setLoggedinUser(res.data)
}
// function signup(credentials) {
//     return axios.post(BASE_URL + '/auth/signup', credentials)
//         .then(res => _setLoggedinUser(res.data))
// }

async function logout() {
    await axios.post(BASE_URL + '/auth/logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}
// function logout() {
//     return axios.post(BASE_URL + '/auth/logout')
//         .then(() => {
//             sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
//         })
// }

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
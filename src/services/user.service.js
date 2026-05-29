import { httpService } from './http.service.js'

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
    return await httpService.get('user')
}

async function getById(userId) {
    return await httpService.get(`user/${userId}`)
}

async function login(credentials) {
    const user = await httpService.post(
        'auth/login',
        credentials
    )

    return _setLoggedinUser(user)
}

async function signup(credentials) {
    const user = await httpService.post(
        'auth/signup',
        credentials
    )

    return _setLoggedinUser(user)
}

async function logout() {
    await httpService.post('auth/logout')

    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}

// async function query() {
//     const res = await axios.get(BASE_URL + '/user')
//     return res.data
// }

// async function getById(userId) {
//     const res = await axios.get(BASE_URL + '/user/' + userId)
//     return res.data
// }

// async function login(credentials) {
//     const res = await axios.post(BASE_URL + '/auth/login', credentials)
//     return _setLoggedinUser(res.data)
// }

// async function signup(credentials) {
//     const res = await axios.post(BASE_URL + '/auth/signup', credentials)
//     return _setLoggedinUser(res.data)
// }

// async function logout() {
//     await axios.post(BASE_URL + '/auth/logout')
//     sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
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
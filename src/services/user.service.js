import { storageService } from "./async-storage.service.js"

export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    getById,
    query,
    getEmptyCredentials,
}

const STORAGE_KEY_LOGGEDIN = 'user'
const STORAGE_KEY = 'userDB'

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname }

    return userService.query(STORAGE_KEY)
        .then(users => {
            if (users.find(user => user.username === username)) {
                return Promise.reject('username taken')
            }
            user.createdAt = user.updatedAt = Date.now()
            user.balance = 100
            // user.activities = []

            return storageService.post(STORAGE_KEY, user)
                .then(_setLoggedinUser)
        })
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
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

// function addActivity(userId, activityType, data, credit) {
//     return getById(userId)
//         .then(user => {
//             const activity = { type: activityType, at: Date.now(), ...data }
//             user.activities.unshift(activity)
//             user.balance += credit

//             return storageService.put(STORAGE_KEY, user)
//         })
// }

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, balance: user.balance }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

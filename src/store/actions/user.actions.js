import { store } from '../store.js'
import { userService } from '../../services/user.service.js'
import { SET_USER } from '../reducers/user.reducer.js'

export async function login(credentials) {

    try {
        const loggedinUser = await userService.login(credentials)
        store.dispatch({ type: SET_USER, loggedinUser })
        return loggedinUser
    } catch (err) {
        console.error('Could not log in', err)
        throw err
    }

}
// export function login(credentials) {
//     return userService.login(credentials)
//         .then(loggedinUser => {
//             store.dispatch({ type: SET_USER, loggedinUser })
//             return loggedinUser
//         })
// }

export async function signup(credentials) {

    try {
        const loggedinUser = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, loggedinUser })
        return loggedinUser
    } catch (err) {
        console.error('Could not sign up', err)
        throw err
    }

}

// export function signup(credentials) {
//     return userService.signup(credentials)
//         .then(loggedinUser => {
//             store.dispatch({ type: SET_USER, loggedinUser })
//             return loggedinUser
//         })
// }

export async function logout() {

    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, loggedinUser: null })
    } catch (err) {
        console.error('Could not log out', err)
        throw err
    }

}
// export function logout() {
//     return userService.logout()
//         .then(loggedinUser => {
//             store.dispatch({ type: SET_USER, loggedinUser: null })
//         })
// }
import { httpService } from "./http.service.js"

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getEmptyCredentials
}

async function login({ username, password }) {

    try {
        const user = await httpService.post(BASE_URL + 'login', { username, password })
        console.log('user FETCH:', user)
        if (user) return _setLoggedinUser(user)
        else throw new Error('Invalid login')
    } catch (err) {
        console.log('login -> Failed:', err)
        throw err
    }
}

async function signup({ username, password, fullname }) {
    const user = { username, password, fullname, score: 10000 }

    try {
        const newUser = await httpService.post(BASE_URL + 'signup', user)
        if (newUser) return _setLoggedinUser(newUser)
        else throw new Error('Invalid signup')
    } catch (err) {
        console.log('signup -> Failed', err)
        throw err
    }
}

async function logout() {
    try {
        await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    } catch (err) {
        console.log('logout -> Failed', err)
        throw err
    }
}

async function updateScore(diff) {
    if (getLoggedinUser().score + diff < 0) throw new Error('No credit')

    try {
        const user = await httpService.put('user/', { diff })
        _setLoggedinUser(user)
        return user.score
    } catch (err) {
        console.log('Failed -> uopdate score', err)
    }
}

function getById(userId) {
    return httpService.get('user/' + userId)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}






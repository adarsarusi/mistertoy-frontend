import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'

const TOY_KEY = 'toyDB'
const emptyToyImg = 'src/assets/Buzz-Lightyear-PNG-File.webp'

_createToys()

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getFilterFromSearchParams,
}
// For Debug (easy access from console):
window.cs = toyService

function query(filterBy = {}) {
    return storageService.query(TOY_KEY)
        .then(toys => {

            if (filterBy.name) {
                const regExp = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }

            if (filterBy.inStock && filterBy.inStock !== 'all') {
                toys = toys.filter(toy =>
                    filterBy.inStock === 'in' ? toy.inStock : !toy.inStock
                )
            }

            if (filterBy.labels?.length) {
                toys = toys.filter(toy =>
                    filterBy.labels.every(label => toy.labels.includes(label))
                )
            }

            return toys
        })
}

function get(toyId) {
    return storageService.get(TOY_KEY, toyId)
        .then(toy => {
            toy = _setNextPrevToyId(toy)
            return toy
        })
}

function remove(toyId) {
    const user = userService.getLoggedinUser()

    return storageService.remove(TOY_KEY, toyId)
    // .then(() => {
    //     if (user) userService.addActivity(user._id, 'remove', { todoId: todoId })
    // })
}

function save(toy, isToggle = false) {
    const user = userService.getLoggedinUser()
    // const credit = (toy.isDone && isToggle) ? 10 : 0

    if (toy._id) {
        toy.updatedAt = Date.now()

        return storageService.put(TOY_KEY, toy)
        // .then(savedToy => {
        //     if (user) userService.addActivity(user._id, 'update', { toyId: savedToy._id }, credit)
        //     return savedToy
        // })
    } else {
        toy.createdAt = toy.updatedAt = Date.now()

        return storageService.post(TOY_KEY, toy)
        // .then(savedToy => {
        //     if (user) userService.addActivity(user._id, 'add', { toyId: savedToy._id }, credit)
        //     return savedToy
        // })
    }
}

function getEmptyToy(name = '', imgUrl = emptyToyImg) {
    return { name, imgUrl, price: 123, labels: [], inStock: true }
}

function getDefaultFilter() {
    return { name: '', inStock: 'all', labels: [], sortBy: 'name', sortDir: 1 }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}

// function getImportanceStats() {
//     return storageService.query(TOY_KEY)
//         .then(todos => {
//             const todoCountByImportanceMap = _getTodoCountByImportanceMap(todos)
//             const data = Object.keys(todoCountByImportanceMap).map(speedName => ({ title: speedName, value: todoCountByImportanceMap[speedName] }))
//             return data
//         })
// }

function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        const names = ['Buzz Buzz Buzz 🎵', 'Definately not Buzz', 'Absolutely not Buzz', 'Woody']
        for (let i = 0; i < 10; i++) {
            const name = names[utilService.getRandomIntInclusive(0, names.length - 1)]
            toys.push(_createToy(name + (i + 1)))
        }
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function _createToy(name, imgUrl) {
    const toy = getEmptyToy(name, imgUrl)
    toy._id = utilService.makeId()
    toy.createdAt = toy.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    return toy
}

function _setNextPrevToyId(toy) {
    return storageService.query(TOY_KEY).then((toys) => {
        const toyIdx = toys.findIndex((currToy) => currToy._id === toy._id)
        const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
        const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
        toy.nextToyId = nextToy._id
        toy.prevToyId = prevToy._id
        return toy
    })
}

// function _getTodoCountByImportanceMap(todos) {
//     const todoCountByImportanceMap = todos.reduce((map, todo) => {
//         if (todo.importance < 3) map.low++
//         else if (todo.importance < 7) map.normal++
//         else map.urgent++
//         return map
//     }, { low: 0, normal: 0, urgent: 0 })
//     return todoCountByImportanceMap
// }

// Data Model:
// const todo = {
//     _id: "gZ6Nvy",
//     name: "Master Redux",
//     importance: 9,
//     isDone: false,
//     createdAt: 1711472269690,
//     updatedAt: 1711472269690
// }


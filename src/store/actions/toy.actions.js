import { store } from '../store.js'
import { toyService } from '../../services/toy.service.js'
import { ADD_TOY, REMOVE_TOY, SET_TOYS, SET_IS_LOADING, UPDATE_TOY } from '../reducers/toy.reducer.js'
// import { SET_USER_BALANCE } from '../reducers/user.reducer.js'

// All toys are are stored in the store
// Use getFilteredToys to get the filtered toys

export function loadToys() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

	return toyService.query()
        .then(toys => store.dispatch({ type: SET_TOYS, toys }))
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}

export function removeToy(toyId) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return toyService.remove(toyId)
        .then(() => store.dispatch({ type: REMOVE_TOY, toyId }))
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}

export function saveToy(toy, isToggle = false) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const type = toy._id ? UPDATE_TOY : ADD_TOY

    return toyService.save(toy, isToggle)
        .then(savedToy => {
            store.dispatch({ type, toy: savedToy })
            // if (isToggle && toy.isDone) {
            //     store.dispatch({ type: SET_USER_BALANCE })
            // }
            return savedToy
        })
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}

// Stats are calculated based on all toys

export function getStats(state) {
    const total = state.toyModule.toys.length
    const stock = state.toyModule.toys.filter(toy => toy.inStock).length

    return { total, stock }
}

// Get toys with filtering applied

export function getFilteredToys(state) {
    const filterBy = state.toyModule.filterBy
    let toys = [...state.toyModule.toys]

    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        toys = toys.filter(toy => regExp.test(toy.txt))
    }

    if (filterBy.importance) {
        toys = toys.filter(toy => toy.importance >= filterBy.importance)
    }

    if (filterBy.status) {
        toys = toys.filter(toy => 
            filterBy.status === 'done' ? toy.isDone : !toy.isDone)
    }

    return toys
}
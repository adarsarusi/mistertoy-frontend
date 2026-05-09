import axios from 'axios'

const BASE_URL = 'http://localhost:3030/api/toy'
const emptyToyImg = 'public/Buzz-Lightyear-PNG-File.webp'

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getFilterFromSearchParams,
}

function query(filterBy = {}) {
    const params = {
        name: filterBy.name || '',
        inStock: filterBy.inStock || 'all',
        labels: filterBy.labels?.join(',') || '',
        sortBy: filterBy.sortBy || 'name',
        sortDir: filterBy.sortDir || 1
    }

    return axios.get(BASE_URL, { params })
        .then(res => res.data)
}

function get(toyId) {
    return axios.get(`${BASE_URL}/${toyId}`)
        .then(res => res.data)
}

function remove(toyId) {
    return axios.delete(`${BASE_URL}/${toyId}`)
        .then(res => res.data)
}

function save(toy) {
    if (toy._id) {
        return axios.put(`${BASE_URL}/${toy._id}`, toy)
            .then(res => res.data)
    } else {
        return axios.post(BASE_URL, toy)
            .then(res => res.data)
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
        filterBy[field] = searchParams.get(field) || defaultFilter[field]
    }

    if (typeof filterBy.labels === 'string') {
        filterBy.labels = filterBy.labels ? filterBy.labels.split(',') : []
    }

    filterBy.sortDir = +filterBy.sortDir || 1

    return filterBy
}
import { httpService } from './http.service.js'

const emptyToyImg = '/Buzz-Lightyear-PNG-File.webp'

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getFilterFromSearchParams,
}

async function query(filterBy = {}) {
    const params = {
        name: filterBy.name || '',
        inStock: filterBy.inStock || 'all',
        labels: filterBy.labels?.join(',') || '',
        sortBy: filterBy.sortBy || 'name',
        sortDir: filterBy.sortDir || 1,
    }

    return await httpService.get('toy', params)
}

async function get(toyId) {
    return await httpService.get(`toy/${toyId}`)
}

async function remove(toyId) {
    return await httpService.delete(`toy/${toyId}`)
}

async function save(toy) {
    if (toy._id) {
        return await httpService.put(`toy/${toy._id}`, toy)
    } else {
        return await httpService.post('toy', toy)
    }
}

// async function query(filterBy = {}) {
//     const params = {
//         name: filterBy.name || '',
//         inStock: filterBy.inStock || 'all',
//         labels: filterBy.labels?.join(',') || '',
//         sortBy: filterBy.sortBy || 'name',
//         sortDir: filterBy.sortDir || 1
//     }

//     const res = await axios.get(BASE_URL, { params })
//     return res.data
// }

// async function get(toyId) {
//     const res = await axios.get(`${BASE_URL}/${toyId}`)
//     return res.data
// }

// async function remove(toyId) {
//     const res = await axios.delete(`${BASE_URL}/${toyId}`)
//     return res.data
// }

// async function save(toy) {
//     if (toy._id) {
//         const res = await axios.put(`${BASE_URL}/${toy._id}`, toy)
//         return res.data
//     } else {
//         const res = await axios.post(BASE_URL, toy)
//         return res.data
//     }
// }

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
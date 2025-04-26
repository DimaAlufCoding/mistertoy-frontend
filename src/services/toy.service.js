import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getRandomToy
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)

}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        imgUrl: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        inStock: true,
    }
}

function getRandomToy() {
    const toyNames = ['Talking Doll', 'Puzzle Box', 'Paint Kit', 'Remote Car', 'Lego Set', 'Baby Rattle']

    const allLabels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

    const name = utilService.getRandomFromArray(toyNames)
    const labels = utilService.getRandomSubset(allLabels)
    const price = utilService.getRandomIntInclusive(20, 200)
    const inStock = Math.random() > 0.3

    return {
        name,
        price,
        labels,
        createdAt: Date.now(),
        inStock,
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}
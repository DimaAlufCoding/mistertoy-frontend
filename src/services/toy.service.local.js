import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

_createToys()

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
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.txt) filterBy.txt = ''
            if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            if (!filterBy.labels) filterBy.labels = []

            const regExp = new RegExp(filterBy.txt, 'i')

            const filteredToys =  toys.filter(toy => {
                const nameMatches = regExp.test(toy.name)
                const priceMatches = toy.price <= filterBy.maxPrice
                const stockMatches = (filterBy.inStock === undefined) || (toy.inStock === filterBy.inStock)
                const labelMatches = (filterBy.labels.length === 0 || filterBy.labels.some(label => toy.labels.includes(label)))
 

                return nameMatches && priceMatches && stockMatches && labelMatches 

            })

            if(filterBy.sortBy){
                const sortBy = filterBy.sortBy
                filteredToys.sort((a,b)=>{
                    if (sortBy === 'name') return a.name.localeCompare(b.name)
                        if (sortBy === 'price') return a.price - b.price
                        if (sortBy === 'created') return new Date(a.createdAt) - new Date(b.createdAt)
                        return 0
                })
            }
            return filteredToys
        })
}


// function query(filterBy){
//     return storageService.query(STORAGE_KEY)
//     .then(toys => {
//         if(filterBy.txt){
//             const regExp = new RegExp(filterBy.txt, 'i')
//             toys = toys.filter(toy => regExp.test(toy.name))
//         }

//         if(filter)
//     })

// }

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        toy._id = utilService.makeId()
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
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



function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (toys && toys.length) return


    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
    toys = [
        {
            _id: 't101',
            name: 'Talking Doll',
            imgUrl: 'hardcoded-url-for-now',
            price: 123,
            labels: ['Doll', 'Battery Powered', 'Baby'],
            createdAt: 1631031801011,
            inStock: true,
        },

    ]

    utilService.saveToStorage(STORAGE_KEY, toys)
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

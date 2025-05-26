import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { ADD_TOY_TO_CART } from '../store/reducers/toy.reducer.js'
import { loadToys, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { useEffectOnUpdate } from '../hooks/useEffectOnUpdate.js'
import { useOnlineStatus } from '../hooks/useOnlineStatus.js'
import { useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys || [])

    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    const isOnline = useOnlineStatus()

    useEffect(() => {
        console.log(`status: ${isOnline ? 'online' : 'offline'}`)
    }, [isOnline])

    useEffectOnUpdate(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    async function onRemoveToy(toyId) {
        try {
            await removeToyOptimistic(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            showErrorMsg('Cannot remove toy', err)
        }
    }

    async function onAddToy() {
        const toyToSave = toyService.getRandomToy()

        try {
            const savedToy = await saveToy(toyToSave)
            showSuccessMsg(`Toy added (id: ${savedToy._id})`)
        } catch (err) {
            showErrorMsg('Cannot add toy', err)
        }
    }

    async function onEditToy(toyId) {

        try {
            const toyToSave = await toyService.getById(toyId)
            const savedToy = await saveToy(toyToSave)
            showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
        } catch (err) {
            showErrorMsg('Cannot update toy', err)
        }

    }

    function addToCart(toy) {
        dispatch({ type: ADD_TOY_TO_CART, toy })
        showSuccessMsg('Added to Cart')
    }

    return (

        <main>
            <section className='toy-index'>
                <section className='add-toy-header'>
                    <Stack spacing={2} direction="row">
                        <Button
                            variant="contained"
                            color='primary'
                            onClick={onAddToy}>
                            Add Random Toy
                        </Button>
                        <Button
                            component={Link}
                            to="/toy/edit"
                            variant="contained"
                            color="primary"
                        >
                            Add Toy
                        </Button>
                    </Stack>
                </section>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading
                    ? <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                        addToCart={addToCart}
                    />
                    : <div>Loading...</div>
                }
            </section>
        </main>
    )
}